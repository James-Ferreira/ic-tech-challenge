/**
 * Interface representing the Builder design pattern
 */
export default interface Builder<T> {
    build(): T;
    reset(): void;
}