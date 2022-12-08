import React from "react"

const Input = React.forwardRef((props, ref) => (
	<div className="relative flex sm:flex-row sm:items-center sm:justify-between md:mt-[22px] md:flex-col md:justify-start">
		<label
			htmlFor=""
			className="text-[#1E213F] sm:mt-[5px] md:mt-0 md:mb-[5px]"
		>
			{props.name}
		</label>
		<div className="block time">
			<input
				type="number"
				name={props.id}
				id={props.id}
				ref={ref}
				defaultValue={props.defaultValue}
			/>
			<div className="absolute right-[16px] flex flex-col sm:bottom-2 md:bottom-0  md:top-10">
				<button
					className="time-button"
					onClick={() => {
						const input = document.getElementById(props.id)
						input.stepUp()
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="7"
						className="time-button mb-[9px]"
					>
						<path className="stroke" d="M1 6l6-4 6 4" />
					</svg>
				</button>
				<button
					onClick={() => {
						const input = document.getElementById(props.id)
						input.stepDown()
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="7"
					>
						<path className="stroke" d="M1 1l6 4 6-4" />
					</svg>
				</button>
			</div>
		</div>
	</div>
))

export default Input
