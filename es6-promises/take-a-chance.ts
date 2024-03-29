export function takeAChance(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() <= 0.5
        ? resolve(`Hooray! You're so lucky, ${name}!`)
        : reject(new Error(`It's just bad luck, ${name}.`)); // why pass in an Error object instead of just the string?
    }, 2000);
  });
}
