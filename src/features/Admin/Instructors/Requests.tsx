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
import { useGetVideoMutation } from "../../../redux/features/course/courseApi";
import responseErrorCatch from "../../../utils/responseErrorToast";
import { useGetUsersQuery } from "../../../redux/features/admin/Users/userApi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSocketContext } from "../../../context/SocketContextProvider";

type props = {
  setNotification: React.Dispatch<React.SetStateAction<number>>;
};
const Requests = ({ setNotification }: props) => {
  useGetUsersQuery();
  const { socketStore } = useSocketContext();
  console.log("socketStore.instructorRequests", socketStore.instructorRequests);
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

  const [getVideo] = useGetVideoMutation();

  const [certificatUrl, setCertificateUrl] = useState("");
  const [extention, setExtention] = useState("");

  useEffect(() => {
    setNotification(socketStore.instructorRequests.length);
  }, [socketStore.instructorRequests]);

   useEffect(() => {
     setTableData([...InstructorRequests]);
   }, [InstructorRequests]);


  useEffect(() => {
    if (certificatUrl) {
      const QMarkSplit = certificatUrl.split("?");
      const DotSplit = QMarkSplit[0].split(".");
      if (DotSplit[DotSplit.length - 1].toLowerCase() === "pdf") {
        setExtention("pdf");
      } else {
        setExtention("img");
      }
    }
  }, [certificatUrl]);

  useEffect(() => {
    if (isSuccess) {
      const user = data as IapproveorRejectInstructorRequestsRes;
      const userInfo = user.data as IInstructorRequest;
      if (userInfo.status === "approved") {
        const userId = userInfo.userId;

        const fetchedUser = userData.find((item) => item._id === userId);
        const newUser = { ...fetchedUser, role: "instructor" };
        dispatch(removeUser({ data: userId }));
        dispatch(addInstrctor({ data: newUser }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleGetCertificate = async (certificate: string) => {
    try {
      const presignedUrl = await getVideo({ videoName: certificate });
      if ("data" in presignedUrl) {
        if (presignedUrl.data) {
          setCertificateUrl(presignedUrl.data.data as string);
        }
      }
    } catch (error) {
      responseErrorCatch(error);
    }
  };

  return (
    <>
      {" "}
      {tableData && tableData.length ? (
        <div>
          {certificatUrl ? (
            <div className=" h-screen w-full p-7 relative">
              {extention === "img" ? (
                <img
                  className="object-center h-full w-full  rounded-lg"
                  src={certificatUrl}
                  title="Certificate"
                />
              ) : (
                <embed
                  src={certificatUrl}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                />
              )}

              <div className="absolute top-9 right-9 cursor-pointer">
                <IoCloseCircleOutline
                  size={35}
                  onClick={() => setCertificateUrl("")}
                />
              </div>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              {tableData.length ? (
                <>
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <Thead>
                      <tr>
                        <Th> Sl No</Th>
                        <Th> User</Th>
                        <Th>Status</Th>
                        <Th>Qualification</Th>
                        <Th>Certificate</Th>
                        <Th>Action</Th>
                      </tr>
                    </Thead>

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
                          <Td>
                            {" "}
                            <button
                              className="dark:bg-c_color-colorSeven rounded-full font-bold py-1 px-3 mr-1 hover:scale-110"
                              onClick={() => {
                                handleGetCertificate(item.certificate);
                              }}
                            >
                              View Certificate
                            </button>
                          </Td>
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
              ) : (
                <div className="flex items-center justify-center h-screen">
                  <h1 className="font-bold text-4xl">No Requests Found</h1>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          {" "}
          <h1 className="text-4xl font-semibold italic">
            There is no requests found..
          </h1>
        </div>
      )}
    </>
  );
};

export default Requests;

