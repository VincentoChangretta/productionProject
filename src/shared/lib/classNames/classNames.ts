type Mods = Record<string, boolean | string>;
// этот тип определяет, что моды должны иметь как ключ string, как значение boolean

export function classNames(
  cls: string,
  mods: Mods = {},
  additional: string[] = [],
): string {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
