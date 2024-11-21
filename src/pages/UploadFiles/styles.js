import { styled } from "@mui/system";
import Autocomplete from "@mui/material/Autocomplete";
import {Button, TextField} from "@mui/material";

export const CustomizedAutocomplete  = styled(Autocomplete)`

    width: 500px;

    &.MuiAutocomplete-root {
        background-color: ${({ theme }) => theme.palette.background.first};

        &.Mui-focused {
            background-color: ${({ theme }) => theme.palette.background.default};
        }

        &.MuiAutocomplete-hasClearIcon {
            background-color: ${({ theme }) => theme.palette.background.default};
        }
    }

    & .MuiInputBase-root {
        width: 500px;
        height: 56px;
        border-radius: 0;

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: ${({ theme }) => theme.palette.primary.main};
        }
    }

    & .MuiFormControl-root {
        padding-bottom: 2px;
    }

    & .MuiFormControl-root:hover .MuiFormLabel-filled {
        color: ${({ theme }) => theme.palette.primary.main};
    }

    & .MuiOutlinedInput-notchedOutline {
        border-width: 2px;
    }
`;

export const CustomizedTextField  = styled(TextField)`

    width: 500px;

    & .MuiInputBase-root {
        width: 500px;
        height: 56px;
        border-radius: 0;
        background-color: ${({ theme }) => theme.palette.background.first};

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: ${({ theme }) => theme.palette.primary.main};
        }

        &.Mui-focused {
            background-color: ${({ theme }) => theme.palette.background.default};
        }
    }

    &:hover .MuiFormLabel-filled {
        color: ${({ theme }) => theme.palette.primary.main};
    }

    .MuiInputBase-input:not([value=""]) {
        background-color: ${({ theme }) => theme.palette.background.default};
    }

    & .MuiOutlinedInput-notchedOutline {
        border-width: 2px;
    }

    & .MuiFormControl-root {
        padding-bottom: 2px;
    }
`;

export const CustomizedButton = styled(Button)`
    text-transform: none;

    &:hover {
        border-bottom-width: 2px;
        border-left-width: 0;
        border-top-width: 0;
        border-right-width: 0;
    }
`;
