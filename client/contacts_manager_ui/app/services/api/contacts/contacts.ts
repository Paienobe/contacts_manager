import { contactsInstance } from "@/app/axios/instances";

export const getContacts = async () => {
  try {
    const request = await contactsInstance.get("/");
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteContact = async (id: string) => {
  try {
    const request = await contactsInstance.delete(`/${id}/delete`);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
