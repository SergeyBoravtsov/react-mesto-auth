import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";
import successPicture from "../images/signupSuccess.svg";
import failPicture from "../images/loginError.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: "", about: "" });
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSignupSuccessPopupOpen, setIsSignupSuccessPopupOpen] = React.useState(false);
  const [isSignupErrorPopupOpen, setIsSignupErrorPopupOpen] = React.useState(false);
  const [isLoginErrorPopupOpen, setIsLoginErrorPopupOpen] = React.useState(false);
  
  // получаем данные о пользователе и карточки с сервера
  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getAllCards()])
      .then(([userData, cardsData]) => {
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((answer) => {
        console.log(answer);
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSignupError() {
    setIsSignupErrorPopupOpen(true);
  }

  function handleSignupSuccess() {
    setIsSignupSuccessPopupOpen(true);
  }

  function handleLoginError() {
    setIsLoginErrorPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSignupSuccessPopupOpen(false);
    setIsLoginErrorPopupOpen(false);
    setIsSignupErrorPopupOpen(false);
    setSelectedCard({});
  }

  // обработчики сабмитов попапов с формами
  function handleUpdateUser(userInputsValues) {
    setIsLoadingData(true); // показать прелоадер
    api
      .setProfileInfo(userInputsValues)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingData(false);
      });
  }

  function handleUpdateAvatar(avatarInputValue) {
    setIsLoadingData(true); // показать прелоадер
    api
      .setAvatar(avatarInputValue)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingData(false);
      });
  }

  function handleAddPlaceSubmit(placeInputsValues) {
    setIsLoadingData(true); // показать прелоадер
    api
      .addCard(placeInputsValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        setIsLoadingData(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoadingData(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>

        <Route exact path="/">
          <div className="page">
            <div className="content">
              <Header />

              <ProtectedRoute
                exact
                path="/"
                component={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />

              <Footer />
            </div>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoadingData}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoadingData}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoadingData}
            />

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          </div>
        </Route>


        <Route path="/sign-up">
          {isLoggedIn 
            ? <Redirect to="/" /> 
            : <Register onError={handleSignupError} onSuccess={handleSignupSuccess} />
          }

          <InfoTooltip
            name="signup-error"
            isOpen={isSignupErrorPopupOpen}
            onClose={closeAllPopups}
            picture={failPicture}
            info="Что-то пошло не так! Попробуйте ещё раз."
          />
        </Route>


        <Route path="/sign-in">
          {isLoggedIn 
            ? <Redirect to="/" /> 
            : <Login  onError={handleLoginError} />
          }

          <InfoTooltip
            name="login-error"
            isOpen={isLoginErrorPopupOpen}
            onClose={closeAllPopups}
            picture={failPicture}
            info="Что-то пошло не так! Попробуйте ещё раз."
          />

          <InfoTooltip
            name="signup-success"
            isOpen={isSignupSuccessPopupOpen}
            onClose={closeAllPopups}
            picture={successPicture}
            info="Вы успешно зарегистрировались!"
          />
        </Route>

      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
