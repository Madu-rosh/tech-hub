import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#782e2e', // A unique shade of brown
            contrastText: '#fff', // Ensuring text is readable on primary color
        },
        secondary: {
            main: '#7822dd', // A distinct brown
        },
        error: {
            main: '#ff1744',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontSize: '2.2rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        // Additional typography styles
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', // Adding subtle shadow effect to buttons
                    '&:hover': {
                        boxShadow: '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)', // Enhanced shadow on hover
                    },
                },
            },
        },
        MuiAppBar: {
            defaultProps: {
                color: 'primary',
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    transition: '0.3s',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                        transform: 'scale(1.02)', // Slight scale effect on hover
                        boxShadow: '0px 8px 15px rgba(0,0,0,0.2)',
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'rgba(97,97,97,0.9)', // Custom tooltip background color
                    color: 'white', // Text color
                    boxShadow: '0px 8px 9px -5px rgba(0,0,0,0.2)',
                    fontSize: '0.875rem',
                },
            },
        },
        // Add more component customizations as needed
    },
});

export default theme;
