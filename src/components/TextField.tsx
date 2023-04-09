interface TextFieldProps {
    id: string;
    label: string;
    symbol: string;

}

const TextField: React.FC<TextFieldProps> = ({label,symbol,id}) => {
  return (
    <>
      <label
        htmlFor="website-admin"
        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {symbol}
        </span>
        <input
          type="text"
          id={id}
          className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={label}
        />
      </div>
    </>
  );
};

export default TextField;
