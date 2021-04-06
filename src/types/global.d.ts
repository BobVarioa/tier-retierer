declare const $_ENV: { name: string };

type Matrix<T> = Array<Array<T>>;

interface IAction {
	type: "",
	do: () => Matrix<[number, number, number, number]>
}