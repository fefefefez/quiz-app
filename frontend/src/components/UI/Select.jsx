// select component
function Select({value, onChange, options,className= ''})  {
    return (
        <select value={value} onChange={onChange} className={`ui-select ${className}`}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
          ))}
        </select>
    );
}
export default Select; // export the component