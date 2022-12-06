import React from "react"
import upArrow from "../../assets/icon-arrow-up.svg"
import downArrow from "../../assets/icon-arrow-down.svg"

const Input = React.forwardRef((props, ref) => (
	<div className="flex flex-col mt-[22px] relative">
		<label htmlFor="" className="text-[#1E213F] mb-[5px]">
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
			<div className="absolute flex flex-col right-[16px] top-10">
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
