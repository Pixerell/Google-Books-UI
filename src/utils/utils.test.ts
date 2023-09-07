import { stripHtmlTags } from './clearHtmlTags';
import { resetStateValues } from './resetStateValues';
import {
    setStartIndex,
    resetAccumulatedBooks,
    setTotalCount,
    setDisplayCount,
    resetRetryCount,
    PAGINATION_LIMIT,
} from '../redux/dataSlice';

describe('stripHtmlTags function', () => {

    it('should return an empty string if undefined is the text content', () => {
        const inputHtml = '<div>undefined</div>';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('');
    });

    it('should strip HTML tags from a normal string correctly', () => {
        const inputHtml = '<p>Hello <strong>World</strong></p>';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('Hello World');
    });

    it('should return an empty string if input is empty', () => {
        const inputHtml = '';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('');
    });

    it('should handle inputs without HTML tags correctly', () => {
        const inputHtml = 'Hello World';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('Hello World');
    });

    it('should correctly handle inputs with only tags', () => {
        const inputHtml = '<br>';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('');
    });

    it('should correctly handle nested tags', () => {
        const inputHtml = '<div><p>Hello <strong>World</strong></p></div>';
        const outputText = stripHtmlTags(inputHtml);
        expect(outputText).toBe('Hello World');
    });
});

describe('resetStateValues function', () => {
    it('should dispatch correct actions with correct parameters', () => {
        const mockDispatch = jest.fn();

        resetStateValues(mockDispatch);

        expect(mockDispatch).toHaveBeenNthCalledWith(1, setStartIndex(0));
        expect(mockDispatch).toHaveBeenNthCalledWith(2, resetAccumulatedBooks());
        expect(mockDispatch).toHaveBeenNthCalledWith(3, setTotalCount(0));
        expect(mockDispatch).toHaveBeenNthCalledWith(4, setDisplayCount(PAGINATION_LIMIT));
        expect(mockDispatch).toHaveBeenNthCalledWith(5, resetRetryCount());
    });
});

