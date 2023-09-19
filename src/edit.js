import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls } from '@wordpress/block-editor';
import './editor.scss';
import Inspector from './inspector';
import { useState } from '@wordpress/element';
import {
	blockTable,
	justifyLeft,
	tableColumnAfter,
	tableColumnBefore,
	tableColumnDelete,
	tableRowAfter,
	tableRowBefore,
	tableRowDelete,
} from '@wordpress/icons';
import { ToolbarDropdownMenu } from '@wordpress/components';

function Edit({ attributes, setAttributes, isSelected }) {

	const {
		body
	} = attributes;


	const [selectedCellIndex, setSelectedCellIndex] = useState(null);
	const [selectedRowIndex, setSelectedRowIndex] = useState(null);
	const [isSelectedRow, setIsSelectedRow] = useState(false);
	const [isSelectedCell, setIsSelectedCell] = useState(false);

	const onInsertColumn = (index, position) => {
		const updatedBody = [...body];
		updatedBody.forEach((row) => {
			if (position == 'before')
				row.cells.splice(index, 0, { content: '', tag: 'td' });
			if (position == 'after')
				row.cells.splice(index + 1, 0, { content: '', tag: 'td' });
		});
		setAttributes({ body: updatedBody });
		setSelectedCellIndex(null);
	}

	const onDeleteColumn = (index) => {
		let updatedBody = [...body];
		updatedBody = updatedBody.map((row) => {
			// Assuming row is an object with a 'cells' property
			const newRow = { ...row };
			if (newRow.cells.length > index) {
				newRow.cells.splice(index, 1); // Remove the cell at the specified index
			}
			return newRow;
		});

		setAttributes({ body: updatedBody });
	}

	const onDeleteRow = (index) => {
		const updatedBody = [...body];
		updatedBody.splice(index, 1);
		setAttributes({ body: updatedBody });
	}

	const onInsertRow = (index, position) => {
		if (selectedRowIndex === null) return;
		const newRow = {
			cells: Array(body[0].cells.length).fill({ content: '', tag: 'td' }),
		};
		const updatedBody = [...body];
		if (position === 'before')
			updatedBody.splice(index, 0, newRow);
		if (position === 'after')
			updatedBody.splice(index + 1, 0, newRow);
		setAttributes({ body: updatedBody });
		setSelectedRowIndex(null);
	}

	const onSelectRow = () => {
		setIsSelectedRow(!isSelectedRow);
	}
	const onSelectColumn = () => {
		setIsSelectedCell(!isSelectedCell);
	}




	const TableEditControls = [
		{
			icon: tableRowBefore,
			title: __('Insert row before', 'table-block'),
			isDisabled: selectedRowIndex === null,
			onClick: () => onInsertRow(selectedRowIndex, 'before'),
		},
		{
			icon: tableRowAfter,
			title: __('Insert row after', 'table-block'),
			isDisabled: selectedRowIndex === null,
			onClick: () => onInsertRow(selectedRowIndex, 'after'),
		},
		{
			icon: tableRowDelete,
			title: __('Delete row', 'table-block'),
			isDisabled: selectedRowIndex === null,
			onClick: () => onDeleteRow(selectedRowIndex),
		},
		{
			icon: tableColumnBefore,
			title: __('Insert column before', 'table-block'),
			isDisabled: selectedCellIndex === null,
			onClick: () => onInsertColumn(selectedCellIndex, 'before'),
		},
		{
			icon: tableColumnAfter,
			title: __('Insert column after', 'table-block'),
			isDisabled: selectedCellIndex === null,
			onClick: () => onInsertColumn(selectedCellIndex, 'after'),
		},
		{
			icon: tableColumnDelete,
			title: __('Delete column', 'table-block'),
			isDisabled: selectedCellIndex === null,
			onClick: () => onDeleteColumn(selectedCellIndex),
		},
		// {
		// 	icon: splitCell,
		// 	title: __( 'Split merged cells', 'table-block' ),
		// 	isDisabled: ! selectedCells || ! hasMergedCells( selectedCells ),
		// 	onClick: () => onSplitMergedCells(),
		// },
		// {
		// 	icon: mergeCell,
		// 	title: __( 'Merge cells', 'table-block' ),
		// 	isDisabled: ! selectedCells || ! isRectangleSelected( selectedCells ),
		// 	onClick: () => onMergeCells(),
		// },
	];

	console.log({ body, selectedCellIndex, selectedRowIndex });

	return [
		<BlockControls
			group="block"
		>
			<ToolbarDropdownMenu
				label={__('Edit table', 'table-block')}
				icon={blockTable}
				controls={TableEditControls}
				hasArrowIndicator
			/>
		</BlockControls>,

		isSelected && (
			<Inspector
				attributes={attributes}
				setAttributes={setAttributes}
			/>
		),

		<div {...useBlockProps()}>
			<table>
				<tbody>

					{body.map((row, rowIndex) => (
						<tr key={rowIndex}>

							{row?.cells.map((cell, colIndex) => (
								<td>
									{/* {(colIndex == 0) && (
										<>
											<button
												onClick={() => onSelectRow()}>
												Select Row
											</button>

											{(isSelectedRow) && (
												<button
													onClick={() => onDeleteRow()}>
													Delete Row
												</button>
											)}
										</>
									)}

									{(rowIndex == 0) && (
										<>
											<button onClick={() => onSelectColumn()}>
												Select Column
											</button>
											{isSelectedCell && (
												<button onClick={() => onDeleteColumn()}>
													Delete Column
												</button>
											)}
										</>

									)} */}

									<RichText
										className="text"
										value={cell?.content}
										formattingControl={["bold", "italic"]}
										onClick={() => {
											setSelectedCellIndex(colIndex)
											setSelectedRowIndex(rowIndex)
										}}
										onChange={(newContent) => {
											const updatedBody = [...body];
											updatedBody[rowIndex].cells[colIndex].content = newContent;
											setAttributes({ body: updatedBody });
										}}
									/>
								</td>
							))}

						</tr>
					))}

				</tbody>
			</table>
		</div>
	];
}

export default Edit;
