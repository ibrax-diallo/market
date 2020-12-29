import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationList from '../../components/shared/navigation/NavigationList';
import FurnitureBanner from '../../components/partials/homepage/furniture/FurnitureBanner';
import FurnitureSiteFeatures from '../../components/partials/homepage/furniture/FurnitureSiteFeatures';
import FurniturePromotions from '../../components/partials/homepage/furniture/FurniturePromotions';
import FurnitureCategories from '../../components/partials/homepage/furniture/FurnitureCategories';
import FurnitureBestSeller from '../../components/partials/homepage/furniture/FurnitureBestSeller';
import FurniturePromotions2 from '../../components/partials/homepage/furniture/FurniturePromotions2';
import FurnitureTrendingProducts from '../../components/partials/homepage/furniture/FurnitureTrendingProducts';
import FurnitureShopByRoom from '../../components/partials/homepage/furniture/FurnitureShopByRoom';
import FurnitureBestSaleBrands from '../../components/partials/homepage/furniture/FurnitureBestSaleBrands';
import HeaderFurniture from '../../components/shared/headers/HeaderFurniture';
import FooterFurniture from '../../components/shared/footers/FooterFurniture';
import HeaderMobileFurniture from '../../components/shared/headers/HeaderMobileFurniture';
import SubscribePopup from '../../components/shared/SubscribePopup';
import { getCollections } from '../../store/collection/action';
import { switchDemoPanel } from '~/store/app/action';
import SwicherDemo from '~/components/shared/switcher-demo/SwitcherDemo';

/*import '../../scss/electronic.scss';*/
class HomeFurniturePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscribe: false,
        };
    }
    static async getInitialProps(ctx) {
        return { query: ctx.query };
    }

    componentDidMount() {
        const { query } = this.props;
        if (query) {
            const collectionsSlug = [
                'furniture-best-sellers',
                'furniture-trending-products',
            ];
            this.props.dispatch(getCollections(collectionsSlug));
            this.props.dispatch(switchDemoPanel(false));
        }
        setTimeout(() => {
            this.setState({ subscribe: false });
        }, 10000);
    }

    render() {
        const { subscribe } = this.state;
        return (
            <div className="site-content">
                <HeaderFurniture />
                <HeaderMobileFurniture />
                <NavigationList />
                <SubscribePopup active={subscribe} />
                <main id="homepage-8">
                    <FurnitureBanner />
                    <FurnitureSiteFeatures />
                    <FurniturePromotions />
                    <FurnitureBestSeller collectionSlug="furniture-best-sellers" />
                    <FurnitureCategories />
                    <FurniturePromotions2 />
                    <FurnitureTrendingProducts collectionSlug="furniture-trending-products" />
                    <FurnitureShopByRoom />
                    <FurnitureBestSaleBrands />
                </main>
                <FooterFurniture />
                <SwicherDemo />
            </div>
        );
    }
}

export default connect()(HomeFurniturePage);
