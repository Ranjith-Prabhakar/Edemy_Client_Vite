import { useEffect, useState } from "react";
import {
  useGetInstructorRequestsQuery,
  useApproveorRejectInstructorRequestsMutation,
} from "../../../redux/features/admin/InstructorRequests/instructorRequestApi";
import { IInstructorAgreement } from "../../../redux/interfaces/Instructor/generalInterfaces";
import { removeUser } from "../../../redux/features/admin/Users/userSlice";
import { addInstrctor } from "../../../redux/features/admin/Instructors/instructorsSlice";

import { useSelector, useDispatch } from "react-redux";
import { IapproveorRejectInstructorRequestsRes } from "../../../redux/interfaces/Instructor/approveorRejectInstructorRequests";

type Props = {};

const Requests = (props: Props) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, error } = useGetInstructorRequestsQuery({});
  const [
    approveorRejectInstructorRequests,
    { data: instructorMutationData, isSuccess: instructorMutationSuccess },
  ] = useApproveorRejectInstructorRequestsMutation();

  const [tableData, setTableData] = useState([]);
  const InstructorRequests = useSelector(
    (state: any) => state.instructorRequests.instructorRequest
  );
  const userData = useSelector((state: any) => state.users.usersData);

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

  useEffect(() => {
    if (instructorMutationSuccess) {
      const user =
        instructorMutationData as IapproveorRejectInstructorRequestsRes;
      const userInfo = user.data as IInstructorAgreement;
      const userId = userInfo.userId;
      const fetchedUser = userData.find((item) => item._id === userId);
      const newUser = { ...fetchedUser, role: "instructor" };
      console.log("fetchedAUser", fetchedUser);
      dispatch(removeUser({ data: userId }));
      dispatch(addInstrctor({ data: newUser }));
    }
  }, [instructorMutationSuccess]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        {tableData.length && (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    User ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
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
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item: IInstructorAgreement) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4">{item.userName}</td>
                    <td className="px-6 py-4">{item.status}</td>
                    <td className="px-6 py-4">{item.qualification}</td>
                    <td className="px-6 py-4">{item.consent.toString()}</td>
                    <td className="px-6 py-4 flex gap-2 justify-start items-center">
                      <button
                        className="bg-slate-500 text-black font-bold py-1 px-3 rounded-sm"
                        onClick={() => {
                          approveorRejectInstructorRequests({
                            agreementId: item._id as string,
                            userId: item.userId,
                            action: "approved",
                          });
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-slate-500 text-black font-bold py-1 px-3 rounded-sm"
                        onClick={() => {
                          approveorRejectInstructorRequests({
                            agreementId: item._id as string,
                            userId: item.userId,
                            action: "rejected",
                          });
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        {!tableData.length && (
          <div className="flex items-center justify-center h-screen">
            <h1>No Requests Found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
