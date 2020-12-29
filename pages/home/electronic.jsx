import React, { Component } from 'react';
import FooterDefault from '../../components/shared/footers/FooterDefault';
import NavigationList from '../../components/shared/navigation/NavigationList';
import ElectronicBanner from '../../components/partials/homepage/electronic/ElectronicBanner';
import ElectronicTopCategories from '../../components/partials/homepage/electronic/ElectronicTopCategories';
import ElectronicDealOfDay from '../../components/partials/homepage/electronic/ElectronicDealOfDay';
import ElectronicBestSeller from '../../components/partials/homepage/electronic/ElectronicBestSeller';
import ElectronicPromotions2 from '../../components/partials/homepage/electronic/ElectronicPromotions2';
import ElectronicComputerAndTechnology from '../../components/partials/homepage/electronic/ElectronicComputerAndTechnology';
import ElectronicHomeElectronics from '../../components/partials/homepage/electronic/ElectronicHomeElectronics';
import ElectronicCamera from '../../components/partials/homepage/electronic/ElectronicCamera';
import HeaderElectronic from '../../components/shared/headers/HeaderElectronic';
import HeaderMobileElectronic from '../../components/shared/headers/HeaderMobileElectronic';
import SubscribePopup from '../../components/shared/SubscribePopup';

import { connect } from 'react-redux';
import { getCategories, getCollections } from '../../store/collection/action';
import { switchDemoPanel } from '~/store/app/action';
import SwicherDemo from '~/components/shared/switcher-demo/SwitcherDemo';
/*import '../../scss/electronic.scss';*/
class HomeElectronicsPage extends Component {
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
                'electronics-best-sellers',
                'electronic_computer_technology',
                'electronics-cameras-and-videos',
            ];
            const categorySlugs = [
                'computers-and-technologies',
                'consumer-electrics',
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
                <HeaderElectronic />
                <HeaderMobileElectronic />
                <NavigationList />
                <SubscribePopup active={subscribe} />
                <main id="homepage-7">
                    <ElectronicBanner />
                    <ElectronicTopCategories />
                    <ElectronicDealOfDay collectionSlug="computers-and-technologies" />
                    <ElectronicBestSeller collectionSlug="electronics-best-sellers" />
                    <ElectronicPromotions2 />
                    <ElectronicComputerAndTechnology collectionSlug="electronic_computer_technology" />
                    <ElectronicHomeElectronics collectionSlug="consumer-electrics" />
                    <ElectronicCamera collectionSlug="electronics-cameras-and-videos" />
                </main>
                <FooterDefault />
                <SwicherDemo />
            </div>
        );
    }
}

export default connect()(HomeElectronicsPage);
