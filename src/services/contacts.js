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
    ...paginationData,
  };
};

