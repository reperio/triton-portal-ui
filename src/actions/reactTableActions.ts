import { Dispatch } from "react-redux";
import { change } from 'redux-form';
import { RowInfo } from "react-table";

export const expandRow = (row: RowInfo, expanded: boolean[], formName: string) => (dispatch: Dispatch<any>) => {
    let newExpanded: boolean[] = new Array<boolean>(row.pageSize).fill(false);

    for (let index = 0; index < expanded.length; index++) {
        newExpanded[index] = expanded[index];
    }

    newExpanded[row.viewIndex] = !newExpanded[row.viewIndex];

    dispatch(change(formName, 'expandedRows', newExpanded));
};

export const clearExpandedRows = (formName: string) => (dispatch: Dispatch<any>) => {

    dispatch(change(formName, 'expandedRows', {}));
};