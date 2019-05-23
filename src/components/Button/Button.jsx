import React from 'react';

export const Button = ({ style, onClick, value, type,className }) => {
	return (
		<button type={type} style={style} onClick={onClick} className={className} >
			{value}
		</button>
	);
};
