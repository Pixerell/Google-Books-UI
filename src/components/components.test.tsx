import React from 'react';
import {fireEvent, render, screen, getByText, getByAltText} from '@testing-library/react';
import FloatingButton from './floating-button/FloatingButton';
import {useLocation, useNavigate} from 'react-router-dom';
import BookCard from './book-card/BookCard';
import {getCategoryStyles} from '../utils/colors';
import InfoBlock from "./info-block/InfoBlock";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('FloatingButton', () => {
    const useLocationMock = useLocation as jest.MockedFunction<typeof useLocation>;
    const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call scrollTo on root path', () => {
        useLocationMock.mockReturnValue({pathname: '/'} as any);
        useNavigateMock.mockReturnValue(jest.fn() as any);
        window.scrollTo = jest.fn();
        const {getByRole} = render(<FloatingButton/>);
        const yourElement = getByRole('img');
        fireEvent.click(yourElement);

        expect(window.scrollTo).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
    });

    it('should navigate to root on non-root path', () => {
        const navigateMock = jest.fn();
        useLocationMock.mockReturnValue({pathname: '/non-root-path'} as any);
        useNavigateMock.mockReturnValue(navigateMock as any);
        const {getByRole} = render(<FloatingButton/>);
        const yourElement = getByRole('img');
        fireEvent.click(yourElement);

        expect(navigateMock).toHaveBeenCalledWith('/');
    });
});

describe('BookCard', () => {
    it('should render correctly with all the properties available', () => {
        const mockData = {
            id: '123',
            volumeInfo: {
                title: 'Test Title',
                authors: ['Author1', 'Author2'],
                categories: ['Test Category'],
                imageLinks: {
                    thumbnail: '../assets/mockbook.jpg',
                },
            },
        };
        const categoryStyles = getCategoryStyles('test category');
        const {getByText, getByAltText} = render(<BookCard {...mockData} />);

        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Author1, Author2')).toBeInTheDocument();
        expect(getByText('Test category')).toBeInTheDocument();
        expect(getByAltText('Image 123')).toHaveAttribute('src', 'https://books.google.com/books/publisher/content/images/frontcover/123?fife=w600-h800&source=gbs_api');
        expect(getByText('Test category').closest('div')).toHaveStyle(`backgroundColor: ${categoryStyles.backgroundColor}`);
    });

    it('should render correctly when authors and categories are undefined', () => {
        const mockData = {
            id: '123',
            volumeInfo: {
                title: 'Test Title',
                imageLinks: {
                    thumbnail: '../assets/mockbook.jpg',
                },
            },
        };
        const categoryStyles = getCategoryStyles('all');
        const {getByText, getByAltText} = render(<BookCard {...mockData} />);

        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Unknown Author')).toBeInTheDocument();
        expect(getByText('All')).toBeInTheDocument();
        expect(getByAltText('Image 123')).toHaveAttribute('src', 'https://books.google.com/books/publisher/content/images/frontcover/123?fife=w600-h800&source=gbs_api');
        expect(getByText('All').closest('div')).toHaveStyle(`backgroundColor: ${categoryStyles.backgroundColor}`);
    });
});

describe('InfoBlock Component', () => {
    it('should display loading state correctly', () => {
        render(<InfoBlock isLoading={true} error={null}/>);

        expect(screen.getByText('Loading boo...')).toBeInTheDocument();
        expect(screen.getByAltText('Loading Indicator')).toHaveAttribute('src', 'wait.svg');
    });

    it('should display FetchBaseQueryError with status correctly', () => {
        const error: FetchBaseQueryError = {
            status: "CUSTOM_ERROR",
            data: undefined,
            error: "some error",
        };
        render(<InfoBlock isLoading={false} error={error}/>);

        expect(screen.getByText('Error fetching...CUSTOM_ERROR')).toBeInTheDocument();
        expect(screen.getByAltText('Loading Indicator')).toHaveAttribute('src', 'error.svg');
    });

    it('should display dif error correctly', () => {
        const error = {};
        render(<InfoBlock isLoading={false} error={error}/>);
        
        expect(screen.getByText('Serialized error...')).toBeInTheDocument();
        expect(screen.getByAltText('Loading Indicator')).toHaveAttribute('src', 'error.svg');
    });
});