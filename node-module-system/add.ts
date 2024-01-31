type nums = {
  num1: number;
  num2: number;
};

export function add({ num1, num2 }: nums): number {
  return num1 + num2;
}
