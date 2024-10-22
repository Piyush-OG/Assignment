import display from "./assets/Display.svg";
import down from "./assets/down.svg";

function Header({ groupBy, setGroupBy, sortBy, setSortBy }) {
  return (
    <header className="kanban-header">
      <div className="display-dropdown">
        <details>
          <summary className="display-summary">
            <img src={display} alt="display" className="display-icon" />
            <span className="display-title">Display</span>
            <img src={down} alt="down" className="down-icon" />
          </summary>
          <div className="dropdown">
            <DropdownRow
              label="Grouping"
              value={groupBy}
              onChange={setGroupBy}
              options={[
                { value: "status", label: "Status" },
                { value: "users", label: "Users" },
                { value: "priority", label: "Priority" },
              ]}
            />
            <DropdownRow
              label="Ordering"
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: "priority", label: "Priority" },
                { value: "title", label: "Title" },
              ]}
            />
          </div>
        </details>
      </div>
    </header>
  );
}

function DropdownRow({ label, value, onChange, options }) {
  return (
    <div className="dropdown-row">
      <span className="dropdown-label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Header;
