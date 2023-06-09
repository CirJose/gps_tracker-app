/*
 *
 * LanguageToggle
 *
 */

import React, { useState, useEffect } from 'react';
import { Container, Content, Card, CardItem, Body, Grid, Col, Row, Left, Right, Header, List, ListItem } from "native-base";
import Text from "../../../components/Text";
import { View, Modal, Pressable } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { appLocales } from 'app/i18n';
import { changeLocale } from '../actions';
import { makeSelectLocale } from '../selectors';

import CountryPicker from "react-native-country-picker-modal";
import { Button } from "../../../components";

import initConfig from "../../../configs/init.config";

import { track4goTheme } from "../../../theme/variables/track4goTheme";
import { Style } from "./style";

import { useIntl } from 'react-intl';
import messages from '../messages';

export default function LocaleToggle(props) {

    // Dispatch
    const dispatch = useDispatch();

    const { formatMessage } = useIntl();

    const lenguaje = useSelector(makeSelectLocale(), shallowEqual);

    const [countryCode, setCountryCode] = useState("EC");
    const [language, setLanguage] = useState("en");
    const [locale, setLocale] = useState("es-EC");
    const [showModal, setShowModal] = useState(false);

    // Setear el codigo de país en el estado local con los datos de la base (una sola vez se ejecuta este parámetro)
    useEffect(() => {
        setCountryCode(lenguaje.country);
        setLanguage(lenguaje.language);
        setLocale(lenguaje.locale);
    }, []) // set the relation between redux country and local state

    const handleSeleccionPais = (country) => {
        console.log(country);
        setCountryCode(country.cca2);
    };

    const handleSeleccionIdioma = (idioma) => {
        setShowModal(false);
        setLanguage(idioma);
        dispatch(changeLocale(locale, countryCode, idioma));
    }

    // Funcion para ejecutar la acción de cambio de idioma en la app
    const handleGuardarIdioma = () => {
        //Guardar en redux
        // dispatch(changeLocale("es-EC", countryCode, language));
        const countryLocale = (initConfig.idioma.listaLocales[countryCode] === undefined ? language : initConfig.idioma.listaLocales[countryCode]);
        dispatch(changeLocale(countryLocale, countryCode, language));
    };

    const modalIdioma = () => {
        return <Modal animationType="slide" transparent={false}
            visible={showModal}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}>
            <Container>
                <Header style={{ alignItems: "center", backgroundColor: "#fff" }} transparent={false}>
                    <Grid>
                        <Col size={25}>
                            <Pressable onPress={() => { setShowModal(false) }}>
                                <FontAwesomeIcon icon="times" size={24} />
                            </Pressable>
                        </Col>
                        <Col size={50}></Col>
                        <Col size={25}></Col>
                    </Grid>
                </Header>
                <Content>
                    <List>
                        {appLocales.map((locale) => (
                            <ListItem key={locale} selected={locale == language ? true : false} onPress={() => { handleSeleccionIdioma(locale) }}>
                                <Left>
                                    <Text>{formatMessage(messages[locale])}</Text>
                                </Left>
                                <Right>
                                    <FontAwesomeIcon icon="chevron-right" />
                                </Right>
                            </ListItem>
                        ))}
                    </List>
                </Content>
            </Container>
        </Modal>

    }

    return (
        <Container>
            <Content padder>
                <Card style={{ elevation: 4 }}>
                    <CardItem header>
                        <Text>{formatMessage(messages.region)}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Grid>
                                <Col size={90}>
                                    <CountryPicker
                                        countryCode={countryCode}
                                        withFlag={true}
                                        withCountryNameButton={true}
                                        withFilter={true}
                                        withAlphaFilter={false}
                                        countryCodes={initConfig.idioma.listaPaises}
                                        onSelect={handleSeleccionPais} />
                                </Col>
                                <Col size={10}><FontAwesomeIcon size={26} icon="chevron-right" /></Col>
                            </Grid>
                        </Body>
                    </CardItem>
                </Card>

                <Card style={{ elevation: 4 }}>
                    <CardItem header>
                        <Text>{formatMessage(messages.idioma)}</Text>
                    </CardItem>
                    <CardItem button onPress={() => { setShowModal(true) }}>
                        <Body>
                            <Grid>
                                <Col size={90}>
                                    <Text>{formatMessage(messages[language])}</Text>
                                </Col>
                                <Col size={10}><FontAwesomeIcon size={26} icon="chevron-right" /></Col>
                            </Grid>

                        </Body>
                    </CardItem>
                </Card>

                {/* Botón para manejo de cambio en idioma y país */}
                <View style={{ paddingTop: track4goTheme.SIZES.BASE * 1 }}>
                    <Button
                        textStyle={{ fontFamily: 'Roboto', fontWeight: 'bold' }}
                        color={track4goTheme.COLORS.BUTTON_ON}
                        style={Style.button}
                        onPress={() => {
                            handleGuardarIdioma()
                        }}>
                        <Text style={{ color: track4goTheme.COLORS.WHITE }}> {formatMessage(messages.btn_guardar)} </Text>
                    </Button>
                </View>
            </Content>
            {/* Inclusión código modal */}
            {modalIdioma()}
        </Container>

    );
}

LocaleToggle.propTypes = {
    onLocaleToggle: PropTypes.func,
    locale: PropTypes.string,
};