"use client"
import { ReactElement, useEffect, useState, useId, Fragment } from "react"
interface DropdownOption {
  value?: number
  text?: string
}

interface DropdownOptions {
  label?: string
  options: DropdownOption[]
}


export const Dropdown = ({ name, options }: { name?: string, options: DropdownOptions[] }) => {

  const [list, setList] = useState<ReactElement[]>([])

  useEffect(() => {
    setList(options.map((option, index) => {
      if (option.label)
        return (
          <optgroup key={String(index)} id={option.label?.replace(/[\s]/, "-").toLowerCase() || String(index)} label={option.label}>
            {option.options.map((opt, ind) => {
              return (
                <option key={String(ind)} id={String(opt.value) || String(ind)} value={opt.value}>
                  {opt.text}
                </option>
              )
            })}
          </optgroup>
        )
      else return (
        <>
          {options.map((option, index) => {
            return (
              <optgroup key={String(index)}>
                {option.options.map((opt, ind) => {
                  
                  return (
                    <option key={String(ind)} id={String(ind)} value={opt.value}>
                      {opt.text}
                    </option>
                  )
                })}
              </optgroup>
            )
          })}
        </>
      )
    }))
  }, [])

  return (
    <div key={useId()}>
      {name && <label key={useId()}>{name}</label>}
      <select key={useId()} className="bg-[#eeeeee] text-xs font-futura font-medium focus:ring-0 border-none">
        {list.map((item, index) => <Fragment key={String(index)}>{item}</Fragment>)}
      </select>
    </div>
  )
}