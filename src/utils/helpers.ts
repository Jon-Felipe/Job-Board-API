export default function getValidTypes(
  filter: string | string[] | undefined,
  allowedTypes: string[]
): string[] {
  const types = Array.isArray(filter) ? filter : filter?.split(',');
  return (types ?? [])?.filter((type) => allowedTypes.includes(type));
}
