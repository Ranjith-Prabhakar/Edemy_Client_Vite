import { useEffect, useState } from "react";
import { useGetInstructorRequestsQuery } from "../../../redux/features/admin/InstructorRequests/instructorRequestApi";
import { useSelector } from "react-redux";

type Props = {};

const Requests = (props: Props) => {
  const { data, isSuccess, isError, error } = useGetInstructorRequestsQuery({});
  const [tableData, setTableData] = useState([]);
  const InstructorRequests = useSelector(
    (state: any) => state.instructorRequests.instructorRequest
  );

  useEffect(() => {
    if (isSuccess) {
      console.log("Request ===>", data.data);
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    setTableData(InstructorRequests);
  }, [InstructorRequests]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Qualification
              </th>
              <th scope="col" className="px-6 py-3">
                Consent
              </th>
              <th scope="col" className="px-6 py-3">
                Contract
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.userId}
                </td>
                <td className="px-6 py-4">{item.status}</td>
                <td className="px-6 py-4">{item.qualification}</td>
                <td className="px-6 py-4">{item.consent.toString()}</td>
                <td className="px-6 py-4">{item.contract}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
