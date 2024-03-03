import { useEffect, useState } from "react";
import { useApproveorRejectInstructorRequestsMutation } from "../../../redux/features/admin/InstructorRequests/instructorRequestApi";
import {
  IUserState,
  removeUser,
} from "../../../redux/features/admin/Users/userSlice";
import { addInstrctor } from "../../../redux/features/admin/Instructors/instructorsSlice";

import { useSelector, useDispatch } from "react-redux";
import { IapproveorRejectInstructorRequestsRes } from "../../../redux/interfaces/Instructor/approveorRejectInstructorRequests";
import {
  IInstructorRequest,
  IInstructorState,
} from "../../../redux/interfaces/Admin/InstructorRequest";
import Thead from "../../../components/Table/Thead";
import Th from "../../../components/Table/Th";
import TableBodyTr from "../../../components/Table/TableBodyTr";
import Td from "../../../components/Table/Td";
import { FaBackward, FaForward } from "react-icons/fa";
import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";

const Requests = () => {
  const dispatch = useDispatch();
  const [approveorRejectInstructorRequests, { data, isSuccess }] =
    useApproveorRejectInstructorRequestsMutation();

  const [tableData, setTableData] = useState<IInstructorRequest[]>([]);
  const InstructorRequests = useSelector(
    (state: { instructorRequests: IInstructorState }) =>
      state.instructorRequests.instructorRequest
  );
  const userData = useSelector(
    (state: { users: IUserState }) => state.users.usersData
  );

  useEffect(() => {
    setTableData(InstructorRequests);
  }, [InstructorRequests]);

  useEffect(() => {
    if (isSuccess) {
      const user = data as IapproveorRejectInstructorRequestsRes;
      const userInfo = user.data as IInstructorRequest;
      const userId = userInfo.userId;
      const fetchedUser = userData.find((item) => item._id === userId) ;
      const newUser = { ...fetchedUser, role: "instructor" };
      console.log("fetchedAUser", fetchedUser);
      dispatch(removeUser({ data: userId }));
      dispatch(addInstrctor({ data: newUser }));
    }
  }, [dispatch, data, isSuccess, userData]);

  return (
    <div>
      <div className="relative overflow-x-auto">
        {tableData.length && (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <Thead>
                <tr>
                  <Th> Sl No</Th>
                  <Th> User</Th>
                  <Th>Status</Th>
                  <Th>Qualification</Th>
                  <Th>Consent</Th>
                  <Th>Action</Th>
                </tr>
              </Thead>

              {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              </thead> */}
              <tbody>
                {tableData.map((item: IInstructorRequest, index) => (
                  <TableBodyTr
                    lastIndex={tableData.length !== index + 1}
                    index={index}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{item.userName.toUpperCase()}</Td>
                    <Td>{item.status}</Td>
                    <Td>{item.qualification}</Td>
                    <Td>{item.consent.toString()}</Td>
                    <Td>
                      <button
                        className="dark:bg-c_color-colorSeven rounded-full font-bold py-1 px-3 mr-1 hover:scale-110"
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
                        className="dark:bg-c_color-colorSeven font-bold py-1 px-3 rounded-full hover:scale-110"
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
                    </Td>
                  </TableBodyTr>

                  // <tr
                  //   key={item._id}
                  //   className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  // >
                  //   <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  //     {item.userId}
                  //   </td>
                  //   <td className="px-6 py-4">{item.userName}</td>
                  //   <td className="px-6 py-4">{item.status}</td>
                  //   <td className="px-6 py-4">{item.qualification}</td>
                  //   <td className="px-6 py-4">{item.consent.toString()}</td>
                  //   <td className="px-6 py-4 flex gap-2 justify-start items-center">
                  //     <button
                  //       className="bg-slate-500 text-black font-bold py-1 px-3 rounded-sm"
                  //       onClick={() => {
                  //         approveorRejectInstructorRequests({
                  //           agreementId: item._id as string,
                  //           userId: item.userId,
                  //           action: "approved",
                  //         });
                  //       }}
                  //     >
                  //       Approve
                  //     </button>
                  //     <button
                  //       className="bg-slate-500 text-black font-bold py-1 px-3 rounded-sm"
                  //       onClick={() => {
                  //         approveorRejectInstructorRequests({
                  //           agreementId: item._id as string,
                  //           userId: item.userId,
                  //           action: "rejected",
                  //         });
                  //       }}
                  //     >
                  //       Reject
                  //     </button>
                  //   </td>
                  // </tr>
                ))}
              </tbody>
            </table>

            <div className=" dark:bg-c_color-colorSeven p-3 flex justify-end gap-1">
              <h4 className="me-2">4 of 5</h4>
              <input
                type="text"
                className="w-[30px] h-[25px] text-black p-0 text-center rounded-md"
              />
              <select
                name=""
                id=""
                className="w-[120px] h-[25px] text-black p-0 ps-2 text-center rounded-md"
              >
                <option value="">5 pages</option>
                <option value="">10 pages</option>
                <option value="">25 pages</option>
                <option value="">50 pages</option>
                <option value="">100 pages</option>
              </select>
              <div className="flex gap-2 mx-2 items-center">
                <FaBackward />
                <IoCaretBack />
                <IoCaretForwardOutline />
                <FaForward />
              </div>
            </div>
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
