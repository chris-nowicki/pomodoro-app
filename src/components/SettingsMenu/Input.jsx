import React from "react"
import upArrow from "../../assets/icon-arrow-up.svg"
import downArrow from "../../assets/icon-arrow-down.svg"

const Input = React.forwardRef((props, ref) => (
	<div className="relative flex sm:flex-row sm:items-center sm:justify-between md:mt-[22px] md:flex-col md:justify-start">
		<label htmlFor="" className="sm:mt-[5px] md:mt-0 md:mb-[5px] text-[#1E213F]">
			{props.name}
		</label>
		<div className="block">
			<input
				type="number"
				name={props.id}
				id={props.id}
				ref={ref}
				defaultValue={props.defaultValue}
			/>
			<div className="absolute right-[16px] flex flex-col sm:bottom-2 md:bottom-0  md:top-10">
				<button
					className="justify-end"
					onClick={() => {
						const input = document.getElementById(props.id)
						input.stepUp()
					}}
				>
					<img src={upArrow} alt="" className="mb-[9px]" />
				</button>
				<button
					className="justify-end"
					onClick={() => {
						const input = document.getElementById(props.id)
						input.stepDown()
					}}
				>
					<img src={downArrow} alt="" />
				</button>
			</div>
		</div>
	</div>
))

export default Input
