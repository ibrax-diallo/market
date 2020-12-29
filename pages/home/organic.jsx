import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationList from '../../components/shared/navigation/NavigationList';
import OrganicBanner from '../../components/partials/homepage/organic/OrganicBanner';
import OrganicSiteFeatures from '../../components/partials/homepage/organic/OrganicSiteFeatures';
import OrganicTopCategories from '../../components/partials/homepage/organic/OrganicTopCategories';
import OrganicPromotions from '../../components/partials/homepage/organic/OrganicPromotions';
import OrganicNewArrivals from '../../components/partials/homepage/organic/OrganicNewArrivals';
import OrganicBlog from '../../components/partials/homepage/organic/OrganicBlog';
import HeaderOrganic from '../../components/shared/headers/HeaderOrganic';
import FooterOrganic from '../../components/shared/footers/FooterOrganic';
import OrganicDealHot from '../../components/partials/homepage/organic/OrganicDealHot';
import OrganicClientSay from '../../components/partials/homepage/organic/OrganicClientSay';
import HeaderMobileOrganic from '../../components/shared/headers/HeaderMobileOrganic';
import SubscribePopup from '../../components/shared/SubscribePopup';
import SwicherDemo from '~/components/shared/switcher-demo/SwitcherDemo';

import { getCollections } from '../../store/collection/action';
import { switchDemoPanel } from '~/store/app/action';

class HomeOrganicPage extends Component {
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
            const collectionsSlug = ['organic-products'];
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
                <HeaderOrganic />
                <HeaderMobileOrganic />
                <NavigationList />
                <SubscribePopup active={subscribe} />
                <main id="homepage-9">
                    <OrganicBanner />
                    <OrganicSiteFeatures />
                    <OrganicTopCategories />
                    <OrganicPromotions />
                    <OrganicDealHot collectionSlug="organic-products" />
                    <OrganicNewArrivals collectionSlug="organic-products" />
                    <OrganicClientSay />
                    <OrganicBlog />
                    <FooterOrganic />
                    <SwicherDemo />
                </main>
            </div>
        );
    }
}

export default connect()(HomeOrganicPage);
