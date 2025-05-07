export const scrollPage = (refElement) => {
  const topSpace = 80;
  window.scrollTo({
    top: refElement.current.offsetTop - topSpace,
    behavior: "smooth",
  });
};

export const handleDetailChange = (
  propertyId,
  field,
  value,
  setFavoriteDetails,
  toast
) => {
  if (field === "numbering") {
    if (value !== "" && (isNaN(value) || parseInt(value) < 1)) {
      toast.error("Preference rank must be a positive number.", {
        position: "top-left",
      });
      return;
    }
    value = value === "" ? "" : parseInt(value).toString();
  }

  setFavoriteDetails((prev) => ({
    ...prev,
    [propertyId]: {
      ...prev[propertyId],
      [field]: field === "notes" ? value.slice(0, 100) : value,
    },
  }));
};

export const toggleEdit = (propertyId, setEditingPropertyId) => {
  setEditingPropertyId((prev) => (prev === propertyId ? null : propertyId));
};