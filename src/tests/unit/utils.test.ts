import { debounce } from "../../utils/utils";

describe('debounce', () => {
    jest.useFakeTimers();

    it('should call the function after the specified delay', () => {
        const mockFn = jest.fn();// mocked function
        const debouncedFn = debounce(mockFn, 500);

        debouncedFn();
        expect(mockFn).not.toBeCalled();

        jest.advanceTimersByTime(500);
        expect(mockFn).toBeCalled();
    });

    it('should not call the function if called again before the delay and call with arguments', () => {
        const mockFn = jest.fn();
        const debouncedFn = debounce(mockFn, 500);

        debouncedFn();
        debouncedFn('arg1', 'arg2');
        expect(mockFn).not.toBeCalled();

        jest.advanceTimersByTime(500);
        expect(mockFn).toBeCalledTimes(1);
        expect(mockFn).toBeCalledWith('arg1', 'arg2');
    });
});
