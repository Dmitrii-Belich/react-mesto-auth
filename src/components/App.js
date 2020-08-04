import React from "react";

import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithImage from "./PopupWithImage";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

export default function App() {
  const [editPopupState, setEditPopupState] = React.useState(false);
  const [addPopupState, setAddPopupState] = React.useState(false);
  const [avatarPopupState, setAvatarPopupState] = React.useState(false);
  const [deletePopupState, setDeletePopupState] = React.useState(false);
  const [imgPopupState, setImgPopupState] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const errShow = (err) => console.log(err);

  React.useEffect(() => {
    Promise.all([api.getUserInformation(), api.getInitialCards()])
      .then((value) => {
        setCurrentUser(value[0]);
        setCards(value[1]);
      })
      .catch(errShow);
  }, []);

  const handleCardLike = (id, isLiked) => {
    const likeShow = (newCard) => {
      const newCards = cards.map((card) =>
        card._id === newCard._id ? newCard : card
      );
      setCards(newCards);
    };
    if (isLiked) {
      api.deleteLike(id).then(likeShow).catch(errShow);
    } else {
      api.setLike(id).then(likeShow).catch(errShow);
    }
  };

  const handleCardDelete = (id) => {
    setSelectedCard({ id });
    setDeletePopupState(true);
  };

  const closeAllPopups = () => {
    setEditPopupState(false);
    setAddPopupState(false);
    setAvatarPopupState(false);
    setDeletePopupState(false);
    setImgPopupState(false);
    setSelectedCard({});
  };

  const isEditProfilePopupOpen = () => {
    setEditPopupState(true);
  };

  const isAddPlacePopupOpen = () => {
    setAddPopupState(true);
  };

  const isEditAvatarPopupOpen = () => {
    setAvatarPopupState(true);
  };

  const handleCardClick = (card) => {
    setImgPopupState(true);
    setSelectedCard(card);
  };

  const handleUpdateUser = async (object) => {
    let isSucssesful = false;
    await api
      .setUserInfo(object)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        isSucssesful = true;
      })
      .catch(errShow);
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  const handleUpdateAvatar = async (avatar) => {
    let isSucssesful = false;
    await api
      .setUserAvatar({ avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        isSucssesful = true;
      })
      .catch(errShow);
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  const handleAddPlaceSubmit = async (card) => {
    let isSucssesful = false;
    await api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        isSucssesful = true;
      })
      .catch(errShow);
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  
  const handleDeleteSubmit = async () => {
    let isSucssesful = false;
    await api
      .deleteCard(selectedCard.id)
      .then((card) => {
        const newCards = cards.filter((card) => card._id !== selectedCard.id);
        setCards(newCards);
        closeAllPopups();
        isSucssesful = true;
      })
      .catch(errShow);
    if (isSucssesful) {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditAvatar={isEditAvatarPopupOpen}
        onEditProfile={isEditProfilePopupOpen}
        onAddPlace={isAddPlacePopupOpen}
        onCardClick={handleCardClick}
        cards={cards}
        onLike={handleCardLike}
        onDelete={handleCardDelete}
      />
      <Footer />
      <PopupWithImage
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={imgPopupState}
      />
      <EditProfilePopup
        isOpen={editPopupState}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={avatarPopupState}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={addPopupState}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <DeleteCardPopup
        isOpen={deletePopupState}
        onClose={closeAllPopups}
        onDelete={handleDeleteSubmit}
      />
    </CurrentUserContext.Provider>
  );
}
