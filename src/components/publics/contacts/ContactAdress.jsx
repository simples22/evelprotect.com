"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const countries = [
  {
    key: "usa",
    country: "United States",
    company: "Evel Protect™ Cosmetics Group",
    address: "Brandon, Florida, United States",
    zip: "33511",
    phone: "+1 (000) 000-0000",
  },
  {
    key: "haiti",
    country: "Haiti",
    company: "Evel Protec™ Cosmetics Group",
    address: "Les Cayes, Sud, Haiti",
    zip: "HT 8110",
    phone: "+509 0000-0000",
  },
  {
    key: "canada",
    country: "Canada",
    company: "Evel Protect™ Cosmetics Group",
    address: "Toronto, Ontario, Canada",
    zip: "M5H 2N2",
    phone: "+1 (000) 000-0000",
  },
];

export default function ContactAdress() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);

  function selectCountry(item) {
    setSelected(item);
    setOpen(false);
  }

  return (
    <section className="evelContactAddress">
      <div className="evelContactAddressInner">
        <div className="evelContactAddressHead">
          <h2>More Options to Join Us</h2>
        </div>

        <div className="evelCountrySelect">
          <button
            type="button"
            className={`evelCountrySelectBtn ${open ? "isOpen" : ""}`}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span>{selected.country}</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

          {open && (
            <div className="evelCountrySelectOptions">
              {countries.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  className={selected.key === item.key ? "isActive" : ""}
                  onClick={() => selectCountry(item)}
                >
                  {item.country}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="evelContactAddressPanel">
          <strong>
            {selected.company} ({selected.country})
          </strong>

          <p>{selected.address}</p>
          <p>Zip Code: {selected.zip}</p>

          <p className="evelContactPhone">
            <FontAwesomeIcon icon={faPhone} />
            {selected.phone}
          </p>
        </div>
      </div>
    </section>
  );
}