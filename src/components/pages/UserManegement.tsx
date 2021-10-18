/* eslint-disable */
import { Center, Wrap, WrapItem } from "@chakra-ui/layout";
import { memo, useCallback, useEffect, VFC } from "react";
import { UserCard } from "../organism/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { Spinner } from "@chakra-ui/spinner";
import { useDisclosure } from "@chakra-ui/react";
import { UserDetailModal } from "../organism/user/userDetailModal";
import { useRecoilValue } from "recoil";

export const UserManegement: VFC = memo(() => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   const { getUsers, users, loading } = useAllUsers();
  //   // const { onSelectUser, selectUser } = useSelectUser();
  //   const userInformation = useRecoilValue(UserInfo);

  //   useEffect(() => getUsers(), []);
  //   const onClickUser = useCallback(
  //     (id: number) => {
  //       onSelectUser({ id, users, onOpen });
  //     },
  //     [users, onSelectUser, onOpen]
  //   );
  //   useEffect(() => {
  //     console.log(userInformation);
  //   }, []);

  return (
    <>
      {/* {loading ? (
        <Center height="100vh">
          <Spinner color="teal" />
        </Center>
      ) : (
        <Wrap spacing="30px" p={{ base: 4, md: 10 }} justify="space-around">
          { {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser}
              ></UserCard>
            </WrapItem>
          ))} }
        </Wrap>
       )}
       <UserDetailModal
         isOpen={isOpen}
         onClose={onClose}
         user={selectUser}
       ></UserDetailModal> */}
    </>
  );
});
