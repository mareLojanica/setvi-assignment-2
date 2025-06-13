import { arrayMove } from "@dnd-kit/sortable";

export const reorderItemsById = <T extends { id: string | number }>(
  items: T[],
  fromId: string | number,
  toId: string | number
): T[] => {
  const oldIndex = items.findIndex((i) => `${i.id}` === `${fromId}`);
  const newIndex = items.findIndex((i) => `${i.id}` === `${toId}`);
  return arrayMove(items, oldIndex, newIndex);
};
