import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = event.context.user;

  const { name, description, tags, visibility, aiPersonaType } = body;

  if (!name || !description || !tags || !visibility || !aiPersonaType) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "All fields are required."
    });
  }

  const { debate } = await prisma.$transaction(async (tx) => {
    const debate = await tx.debate.create({
      data: {
        name,
        description,
        visibility,
        aiPersonaType,
        creatorId: user.id
      }
    });

    const _tags = [];

    for (const tag of tags) {
      const isCreated = await tx.tag.findUnique({ where: { name: tag } });
      if (!isCreated) {
        const { id } = await tx.tag.create({ data: { name: tag }, select: { id: true } });
        _tags.push(id);
      } else {
        _tags.push(isCreated.id);
      }
    }

    await tx.debateTag.createMany({
      data: _tags.map((tagId) => ({
        debateId: debate.id,
        tagId
      }))
    });

    return { debate };
  });

  return {
    status: "success",
    data: debate
  };
});
