export const parseFilterParams = (query) => {
  const { category, name, title } = query;

  return {
    category: typeof category === 'string' ? category : undefined,
    name: typeof name === 'string' ? name : undefined,
    title: typeof title === 'string' ? title : undefined,
  };
};
