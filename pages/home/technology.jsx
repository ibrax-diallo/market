import React from 'react';
import { connect } from 'react-redux';
import NavigationList from '../../components/shared/navigation/NavigationList';
import TechnologyBanner from '../../components/partials/homepage/technology/TechnologyBanner';
import TechnologyPromotions from '../../components/partials/homepage/technology/TechnologyPromotions';
import TechnologyTopCategories from '../../components/partials/homepage/technology/TechnologyTopCategories';
import TechnologySmartPhone from '../../components/partials/homepage/technology/TechnologySmartphone';
import TechnologyLaptopAndSound from '../../components/partials/homepage/technology/TechnologyLatopAndSound';
import TechnologyToys from '../../components/partials/homepage/technology/TechnologyToys';
import TechnologyGoodPrice from '../../components/partials/homepage/technology/TechnologyGoodPrice';
import TechnologyDealOfDay from '../../components/partials/homepage/technology/TechnologyDealOfDay';
import TechnologySiteFeatures from '../../components/partials/homepage/technology/TechnologySiteFeatures';
import HeaderTechnology from '../../components/shared/headers/HeaderTechnology';
import FooterTechnology from '../../components/shared/footers/FooterTechnology';
import HeaderMobileTechnology from '../../components/shared/headers/HeaderMobileTechnology';
import SubscribePopup from '../../components/shared/SubscribePopup';
import { getCategories, getCollections } from '../../store/collection/action';

import { switchDemoPanel } from '~/store/app/action';
import SwicherDemo from '~/components/shared/switcher-demo/SwitcherDemo';
class HomeTechnologyPage extends React.Component {
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
                'technology-toys',
                'technology-good-price',
            ];
            const categorySlugs = [
                'computers-and-technologies',
                'phones-and-accessories',
                'computers-and-technologies',
            ];
            this.props.dispatch(getCollections(collectionsSlug));
            this.props.dispatch(getCategories(categorySlugs));
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
                <HeaderTechnology />
                <HeaderMobileTechnology />
                <NavigationList />
                <SubscribePopup active={subscribe} />
                <main id="homepage-10">
                    <TechnologyBanner />
                    <TechnologySiteFeatures />
                    <TechnologyDealOfDay collectionSlug="computers-and-technologies" />
                    <TechnologyPromotions />
                    <TechnologyTopCategories />
                    <TechnologySmartPhone collectionSlug="phones-and-accessories" />
                    <TechnologyLaptopAndSound collectionSlug="computers-and-technologies" />
                    <TechnologyToys collectionSlug="technology-toys" />
                    <TechnologyGoodPrice collectionSlug="technology-good-price" />
                    <FooterTechnology />
                    <SwicherDemo />
                </main>
            </div>
        );
    }
}

export default connect()(HomeTechnologyPage);
