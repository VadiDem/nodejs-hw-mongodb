import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constans/index.js";
import { parseIsFavourite } from "../utils/parseFilterParams.js";

export const getAllContacts = async (page = 1, perPage = 10, sortBy = 'name', sortOrder = SORT_ORDER.ASC, filter = {}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactsCollection.find(filter).skip(skip).limit(limit).sort({ [sortBy]: sortOrder });

  if (filter.isFavourite !== undefined) {
    const parsedIsFavourite = parseIsFavourite(filter.isFavourite);
    if (parsedIsFavourite !== undefined) {
      contactsQuery = contactsQuery.where('isFavourite').equals(parsedIsFavourite);
    }
  }

  const contactsCount = await ContactsCollection.countDocuments(filter);
  const contacts = await contactsQuery.exec();
  const paginationData = calculatePaginationData(contactsCount, limit, page);

  return {
    data: contacts,
    paginationData, // Виправлення: додавання об'єкта paginationData до результату
  };
};

export const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContacts = async (contactData) => {
  const contact = new ContactsCollection(contactData);
  await contact.save();
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  return contact;
};

export const updateContact = async (contactId, updateData, options = {}) => {
  const contact = await ContactsCollection.findByIdAndUpdate(contactId, updateData, {
    new: true,
    ...options,
  });
  return contact;
};
