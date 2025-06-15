import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Currency.css";
import axios from "axios";

export const Currency = () => {
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("PKR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);

  const currencyOptions = [
    { code: "AFN", name: "Afghan Afghani", symbol: "؋" },
    { code: "ALL", name: "Albanian Lek", symbol: "Lek" },
    { code: "DZD", name: "Algerian Dinar", symbol: "دج" },
    { code: "AOA", name: "Angolan Kwanza", symbol: "Kz" },
    { code: "ARS", name: "Argentine Peso", symbol: "$" },
    { code: "AMD", name: "Armenian Dram", symbol: "֏" },
    { code: "AWG", name: "Aruban Florin", symbol: "ƒ" },
    { code: "AUD", name: "Australian Dollar", symbol: "$" },
    { code: "AZN", name: "Azerbaijani Manat", symbol: "m" },
    { code: "BSD", name: "Bahamian Dollar", symbol: "B$" },
    { code: "BHD", name: "Bahraini Dinar", symbol: ".د.ب" },
    { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
    { code: "BBD", name: "Barbadian Dollar", symbol: "Bds$" },
    { code: "BYR", name: "Belarusian Ruble", symbol: "Br" },
    { code: "BEF", name: "Belgian Franc", symbol: "fr" },
    { code: "BZD", name: "Belize Dollar", symbol: "$" },
    { code: "BMD", name: "Bermudan Dollar", symbol: "$" },
    { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu." },
    { code: "BTC", name: "Bitcoin", symbol: "฿" },
    { code: "BOB", name: "Bolivian Boliviano", symbol: "Bs." },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark", symbol: "KM" },
    { code: "BWP", name: "Botswanan Pula", symbol: "P" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "GBP", name: "British Pound Sterling", symbol: "£" },
    { code: "BND", name: "Brunei Dollar", symbol: "B$" },
    { code: "BGN", name: "Bulgarian Lev", symbol: "Лв." },
    { code: "BIF", name: "Burundian Franc", symbol: "FBu" },
    { code: "KHR", name: "Cambodian Riel", symbol: "KHR" },
    { code: "CAD", name: "Canadian Dollar", symbol: "$" },
    { code: "CVE", name: "Cape Verdean Escudo", symbol: "$" },
    { code: "KYD", name: "Cayman Islands Dollar", symbol: "$" },
    { code: "XOF", name: "CFA Franc BCEAO", symbol: "CFA" },
    { code: "XAF", name: "CFA Franc BEAC", symbol: "FCFA" },
    { code: "XPF", name: "CFP Franc", symbol: "₣" },
    { code: "CLP", name: "Chilean Peso", symbol: "$" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "COP", name: "Colombian Peso", symbol: "$" },
    { code: "KMF", name: "Comorian Franc", symbol: "CF" },
    { code: "CDF", name: "Congolese Franc", symbol: "FC" },
    { code: "CRC", name: "Costa Rican Colón", symbol: "₡" },
    { code: "HRK", name: "Croatian Kuna", symbol: "kn" },
    { code: "CUC", name: "Cuban Convertible Peso", symbol: "$, CUC" },
    { code: "CZK", name: "Czech Republic Koruna", symbol: "Kč" },
    { code: "DKK", name: "Danish Krone", symbol: "Kr." },
    { code: "DJF", name: "Djiboutian Franc", symbol: "Fdj" },
    { code: "DOP", name: "Dominican Peso", symbol: "$" },
    { code: "XCD", name: "East Caribbean Dollar", symbol: "$" },
    { code: "EGP", name: "Egyptian Pound", symbol: "ج.م" },
    { code: "ERN", name: "Eritrean Nakfa", symbol: "Nfk" },
    { code: "EEK", name: "Estonian Kroon", symbol: "kr" },
    { code: "ETB", name: "Ethiopian Birr", symbol: "Nkf" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "FKP", name: "Falkland Islands Pound", symbol: "£" },
    { code: "FJD", name: "Fijian Dollar", symbol: "FJ$" },
    { code: "GMD", name: "Gambian Dalasi", symbol: "D" },
    { code: "GEL", name: "Georgian Lari", symbol: "ლ" },
    { code: "DEM", name: "German Mark", symbol: "DM" },
    { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
    { code: "GIP", name: "Gibraltar Pound", symbol: "£" },
    { code: "GRD", name: "Greek Drachma", symbol: "₯, Δρχ, Δρ" },
    { code: "GTQ", name: "Guatemalan Quetzal", symbol: "Q" },
    { code: "GNF", name: "Guinean Franc", symbol: "FG" },
    { code: "GYD", name: "Guyanaese Dollar", symbol: "$" },
    { code: "HTG", name: "Haitian Gourde", symbol: "G" },
    { code: "HNL", name: "Honduran Lempira", symbol: "L" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "$" },
    { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
    { code: "ISK", name: "Icelandic Króna", symbol: "kr" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    { code: "IRR", name: "Iranian Rial", symbol: "﷼" },
    { code: "IQD", name: "Iraqi Dinar", symbol: "د.ع" },
    { code: "ILS", name: "Israeli New Sheqel", symbol: "₪" },
    { code: "ITL", name: "Italian Lira", symbol: "L,£" },
    { code: "JMD", name: "Jamaican Dollar", symbol: "J$" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "JOD", name: "Jordanian Dinar", symbol: "ا.د" },
    { code: "KZT", name: "Kazakhstani Tenge", symbol: "лв" },
    { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { code: "KWD", name: "Kuwaiti Dinar", symbol: "ك.د" },
    { code: "KGS", name: "Kyrgystani Som", symbol: "лв" },
    { code: "LAK", name: "Laotian Kip", symbol: "₭" },
    { code: "LVL", name: "Latvian Lats", symbol: "Ls" },
    { code: "LBP", name: "Lebanese Pound", symbol: "£" },
    { code: "LSL", name: "Lesotho Loti", symbol: "L" },
    { code: "LRD", name: "Liberian Dollar", symbol: "$" },
    { code: "LYD", name: "Libyan Dinar", symbol: "د.ل" },
    { code: "LTL", name: "Lithuanian Litas", symbol: "Lt" },
    { code: "MOP", name: "Macanese Pataca", symbol: "MOP" },
    { code: "MKD", name: "Macedonian Denar", symbol: "ден" },
    { code: "MGA", name: "Malagasy Ariary", symbol: "Ar" },
    { code: "MWK", name: "Malawian Kwacha", symbol: "MK" },
    { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
    { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf" },
    { code: "MRO", name: "Mauritanian Ouguiya", symbol: "UM" },
    { code: "MUR", name: "Mauritian Rupee", symbol: "₨" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "MDL", name: "Moldovan Leu", symbol: "L" },
    { code: "MNT", name: "Mongolian Tugrik", symbol: "₮" },
    { code: "MAD", name: "Moroccan Dirham", symbol: "د.م." },
    { code: "MZM", name: "Mozambican Metical", symbol: "MT" },
    { code: "MMK", name: "Myanmar Kyat", symbol: "Ks" },
    { code: "NAD", name: "Namibian Dollar", symbol: "$" },
    { code: "NPR", name: "Nepalese Rupee", symbol: "₨" },
    { code: "ANG", name: "Netherlands Antillean Gulden", symbol: "ƒ" },
    { code: "TWD", name: "New Taiwan Dollar", symbol: "NT$" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "$" },
    { code: "NIO", name: "Nicaraguan Córdoba", symbol: "C$" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { code: "KPW", name: "North Korean Won", symbol: "₩" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "OMR", name: "Omani Rial", symbol: "ر.ع." },
    { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
    { code: "PAB", name: "Panamanian Balboa", symbol: "B/." },
    { code: "PGK", name: "Papua New Guinean Kina", symbol: "K" },
    { code: "PYG", name: "Paraguayan Guarani", symbol: "₲" },
    { code: "PEN", name: "Peruvian Nuevo Sol", symbol: "S/." },
    { code: "PHP", name: "Philippine Peso", symbol: "₱" },
    { code: "PLN", name: "Polish Zloty", symbol: "zł" },
    { code: "QAR", name: "Qatari Rial", symbol: "ر.ق" },
    { code: "RON", name: "Romanian Leu", symbol: "lei" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "RWF", name: "Rwandan Franc", symbol: "R₣" },
    { code: "SVC", name: "Salvadoran Colón", symbol: "₡" },
    { code: "WST", name: "Samoan Tala", symbol: "T" },
    { code: "SAR", name: "Saudi Riyal", symbol: "ر.س" },
    { code: "RSD", name: "Serbian Dinar", symbol: "дин." },
    { code: "SCR", name: "Seychellois Rupee", symbol: "₨" },
    { code: "SLL", name: "Sierra Leonean Leone", symbol: "Le" },
    { code: "SGD", name: "Singapore Dollar", symbol: "$" },
    { code: "SKK", name: "Slovak Koruna", symbol: "Sk" },
    { code: "SBD", name: "Solomon Islands Dollar", symbol: "$" },
    { code: "SOS", name: "Somali Shilling", symbol: "S" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "XDR", name: "Special Drawing Rights", symbol: "SDR" },
    { code: "LKR", name: "Sri Lankan Rupee", symbol: "Rs" },
    { code: "SHP", name: "Saint Helena Pound", symbol: "£" },
    { code: "SDG", name: "Sudanese Pound", symbol: "ج.س" },
    { code: "SRD", name: "Surinamese Dollar", symbol: "$" },
    { code: "SZL", name: "Swazi Lilangeni", symbol: "E" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "SYP", name: "Syrian Pound", symbol: "£" },
    { code: "STD", name: "São Tomé and Príncipe Dobra", symbol: "Db" },
    { code: "TJS", name: "Tajikistani Somoni", symbol: "SM" },
    { code: "TZS", name: "Tanzanian Shilling", symbol: "TSh" },
    { code: "THB", name: "Thai Baht", symbol: "฿" },
    { code: "TOP", name: "Tongan Paʻanga", symbol: "T$" },
    { code: "TTD", name: "Trinidad and Tobago Dollar", symbol: "$" },
    { code: "TND", name: "Tunisian Dinar", symbol: "د.ت" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
    { code: "TMT", name: "Turkmenistani Manat", symbol: "T" },
    { code: "UGX", name: "Ugandan Shilling", symbol: "USh" },
    { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴" },
    { code: "AED", name: "United Arab Emirates Dirham", symbol: "د.إ" },
    { code: "UYU", name: "Uruguayan Peso", symbol: "$" },
    { code: "USD", name: "United States Dollar", symbol: "$" },
    { code: "UZS", name: "Uzbekistani Som", symbol: "so'm" },
    { code: "VUV", name: "Vanuatu Vatu", symbol: "Vt" },
    { code: "VEF", name: "Venezuelan Bolívar", symbol: "Bs.S" },
    { code: "VND", name: "Vietnamese Đồng", symbol: "₫" },
    { code: "YER", name: "Yemeni Rial", symbol: "﷼" },
    { code: "ZMK", name: "Zambian Kwacha", symbol: "ZK" },
  ];

  const fetchExchangeRate = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/5d1b34285aaaf83347bbe3bb/latest/${convertFrom}`
      );
      const rate = response.data.conversion_rates[convertTo];
      setExchangeRate(rate);
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [convertFrom, convertTo, amount]);

  const handleAmountChange = (e) => setAmount(e.target.value);

  return (
    <>
      <Navbar name="Currency Calculator" />
      <div className="currencyContainer container">
        <div className="layout currencylayout">
          <form className="form-controls">
            {/* Convert From Input*/}

            <div className="currencyform">
              <div className="form-group form-floating m-3">
                <input
                  className="form-control inputs"
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  min="0"
                  required
                />
                <label className="text-muted" htmlFor="convertFrom">
                  Amount
                </label>
              </div>

              {/* Select boxes*/}

              <div className="m-3 selectors">
                <select
                  className="form-select currencyselector"
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value)}
                >
                  <option className="text-muted" value="">
                    Convert From
                  </option>
                  {currencyOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name} ({option.symbol})
                    </option>
                  ))}
                </select>
                <select
                  className="form-select currencyselector"
                  value={convertTo}
                  onChange={(e) => setConvertTo(e.target.value)}
                >
                  <option className="text-muted" value="">
                    Convert To
                  </option>
                  {currencyOptions.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name} ({option.symbol})
                    </option>
                  ))}
                </select>
              </div>

              {/* result container */}

              <div className="resultDiv">
               
                {convertedAmount !== null && (
                  <div className="converted">
                    <p>
                      {amount} {convertFrom} = {convertedAmount.toFixed(2)}{" "}
                      {convertTo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
