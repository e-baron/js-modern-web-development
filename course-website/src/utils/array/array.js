/**
 * Provide a new 2D Array from an array of Objects, ordered as given in the dataPropertiesNeeded array
 * @param {Array} dataArrayOfObjects : array of objects to be transformed to 2D arrays
 * The objects should always have the same attributes, in the same order !
 * @param {Array} dataPropertiesNeeded : only convert a property to a column if either no array is given, or if it is specified in the array
 * Furthermore, the columns shall be given in the order given by the dataPropertiesNeeded
 * @returns {Array} new2Darray
 */
const transformArrayOfObjectsTo2DArray = (
  dataArrayOfObjects,
  dataPropertiesNeeded
) => {
  let new2DArray = dataArrayOfObjects.map((object) => {
    const allDataPropertiesValues = Object.values(object);
    const allDataPropertiesKeys = Object.keys(object);
    const requestedPropertiesValues = [];
    if (!dataPropertiesNeeded) return allDataPropertiesValues;
    dataPropertiesNeeded.forEach((key, index) => {
      const indexData = allDataPropertiesKeys.indexOf(key);
      if (indexData >= 0)
        requestedPropertiesValues.push(allDataPropertiesValues[indexData]);
    });
    return requestedPropertiesValues;
  });
  return new2DArray;
};
/**
 * Update dataArray by adding a row
 * @param {Array} dataArray : 2D array where a row is to be added
 * @param {Array} newDataRow : new row to be added
 * @param {Number} startIndex : index where to add the new row
 */
const addRowAtIndex = (dataArray, newDataRow, startIndex) => {
  dataArray.splice(startIndex, 0, newDataRow);
};

/**
 * Delete a column in a 2D array
 * @param {Array} dataArray : 2D where a row is to be deleted
 * @param {Number} columnIndex : index of the column to be deleted
 */
const deleteColumnFrom2DArray = (dataArray, columnIndex) => {
  dataArray.forEach((row) => row.splice(columnIndex, 1));
};

/**
 * Add a column in a 2D array with an optional value for all cells
 * Use this function when there is no header in the table
 * @param {Array} dataArray : 2D array where a column is to be added
 * @param {Number} columnIndex : add the column next to this column index
 * @param {Number} valueForAllCells : optional data to be copied in all cells
 * @param {Function} getColumnCellValueFromRowData : optional function that will be called for each row of data passing the data row to the function
 */
const addColumnRightFromGivenIndex = (
  dataArray,
  columnIndex,
  valueForAllCells,
  getColumnCellValueFromRowData
) => {
  dataArray.forEach((row) => {
    // only add value if the check returns true
    let currentColumnCellValue;
    if (!valueForAllCells) {
      currentColumnCellValue = "";
      if (getColumnCellValueFromRowData)
        currentColumnCellValue = getColumnCellValueFromRowData(row);
    } else {
      currentColumnCellValue = valueForAllCells;
    }
    row.splice(columnIndex + 1, 0, currentColumnCellValue);
  });
};

/**
 * Check if a 2D array contains a given value in a given column
 * @param {Array of Array} array2D
 * @param {Number} columnIndex
 * @param {String} value
 */
const array2DContains = (array2D, columnIndex, value) => {
  if (!array2D || !columnIndex || !value) return false;
  for (let index = 0; index < array2D.length; index++) {
    //if(!Array.isArray(row[columnIndex]) || row[columnIndex].length === 0) return false;
    if (array2D[index][columnIndex].includes(value)) return true;
  }
  return false;
};

/**
 * Function that transposes a 2D arrays (from columns to rows)
 * @param {Array} arrayToTranspose : 2D array of data that shall be transposed from columns to rows. This is immutable.
 * @returns {Array} transposed : returns the transpposed array
 */
const transpose2DArray = (arrayToTranspose) => {
  const transposed = arrayToTranspose[0].map((oldCol, oldColIndex) =>
    arrayToTranspose.map((oldCol) => oldCol[oldColIndex])
  );
  return transposed;
};

export {
  addRowAtIndex,
  deleteColumnFrom2DArray,
  transformArrayOfObjectsTo2DArray,
  addColumnRightFromGivenIndex,
  array2DContains,
  transpose2DArray,
};
