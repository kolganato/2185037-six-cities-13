import { Helmet } from 'react-helmet-async';
import Header from '../../components/header';
import ReviewForm from '../../components/review-form';
import { Navigate, useParams } from 'react-router-dom';
import { OfferPreview } from '../../types/offer-preview';
import { AppRoute } from '../../config';
import { ONE_PERCENT, NEARBY_OFFERS_COUNT } from '../../utils/common';
import Map from '../../components/map';
import ReviewList from '../../components/review-list';
import OfferList from '../../components/offer-list';
import { useState } from 'react';
import { reviews } from '../../mocks/review';

type OfferPageProps = {
  offers: OfferPreview[];
};

function OfferPage({ offers }: OfferPageProps): JSX.Element {
  const { id } = useParams();
  const offer = offers.find((item) => item.id === id);

  const [selectedOfferId, setSelectedOfferId] = useState(id);

  const handleOfferCardHover = (offerId: OfferPreview['id']): void => {
    setSelectedOfferId(offerId);
  };

  const handleOfferCardLeave = (): void => {
    setSelectedOfferId(id);
  };

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  const nearbyOffers = offers
    .filter(
      (item) => offer.city.name === item.city.name && offer.id !== item.id
    )
    .slice(0, NEARBY_OFFERS_COUNT);

  const { title, isPremium, type, price, rating, city } = offer;

  return (
    <div className="page">
      <Helmet>
        <title>6 sities: {title}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/room.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-02.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-03.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/studio-01.jpg"
                  alt="Photo studio"
                />
              </div>
              <div className="offer__image-wrapper">
                <img
                  className="offer__image"
                  src="img/apartment-01.jpg"
                  alt="Photo studio"
                />
              </div>
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating / ONE_PERCENT}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  3 Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What`s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by
                    the unique lightness of Amsterdam. The building is green and
                    from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand
                    Square and National Opera, but where the bustle of the city
                    comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">1</span>
                </h2>
                <ReviewList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map
            block="offer"
            city={city}
            offers={[offer, ...nearbyOffers]}
            selectedOfferId={selectedOfferId}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OfferList
              blockClassName="near-places__list places__list"
              offers={nearbyOffers}
              onListOfferHover={handleOfferCardHover}
              onListOfferLeave={handleOfferCardLeave}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
