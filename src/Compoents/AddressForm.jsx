import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const options = [
  { value: 1, label: "Bob" },
  { value: 2, label: "Jessica" },
  { value: 3, label: "Joey" },
];

export default function AddressForm(props) {
  const navigate = useNavigate();

  const [addressInfo, setAddressInfo] = useState({
    address: "",
    primary: false,
  });

  const [selectedOption, setSelectedOption] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addressInfo);
    addressInfo.userId = selectedOption.value;

    let response = await props.axios.post(
      `${import.meta.env.VITE_SOME_BACKEND_URL}/addresses`,
      addressInfo
    );
    console.log(response);

    setAddressInfo({
      description: "",
      primary: false,
    });

    setSelectedOption(1);
    navigate("/");
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAddressInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  function onValueChange(event) {
    // Updating the state with the selected radio button's value
    setAddressInfo((prevState) => {
      return { ...prevState, primary: event.target.value };
    });
  }

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />

      <form onSubmit={handleSubmit}>
        <label>address</label>
        <input
          type="text"
          name="address"
          value={addressInfo.description}
          onChange={handleChange}
          placeholder="Add description of class"
        />

        <label>Primary</label>
        <input
          type="radio"
          value={true}
          // Checking this radio button if the selected option is "Male"
          checked={addressInfo.primary === true}
          onChange={onValueChange}
        />
        <label>Not primary address </label>
        <input
          type="radio"
          value={false}
          // Checking this radio button if the selected option is "Male"
          checked={addressInfo.primary === false}
          onChange={onValueChange}
        />
        <input value="submit" type="submit" />
      </form>
    </div>
  );
}
