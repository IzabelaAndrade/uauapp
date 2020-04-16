import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

// import { Container } from './styles';
import { Feather, AntDesign, Entypo } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
export default function Company({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{ backgroundColor: '#fff', marginTop: 22 }}>
        <Image
          source={{
            uri:
              'https://fotos.vivadecora.com.br/decoracao-chacara-estrutura-de-madeira-e-rede-com-tecido-laranja-revistavd-196228-square_cover_xsmall.jpg',
          }}
          style={{ width, height: 250 }}
          resizeMode="stretch"
        />
        <Image
          source={require('../../assets/border.png')}
          style={{ width: 55, height: 55, marginTop: -65, alignSelf: 'center' }}
          resizeMode="stretch"
        />
        <View style={{ marginVertical: 20, alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 22,
              fontWeight: '500',
              color: '#334d5c',
            }}
          >
            Avanci Construção e Serviços
          </Text>
          <Text style={{ fontFamily: 'Lato-Regular', color: '#b8b89f' }}>
            " A mais de 30 anos construindo história "
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 150,
            justifyContent: 'space-between',
            alignSelf: 'center',
            marginVertical: 10,
          }}
        >
          <Image
            source={require('../../assets/repair(1).png')}
            style={{ width: 25, height: 25 }}
            resizeMode="stretch"
          />
          <Image
            source={require('../../assets/worker.png')}
            style={{ width: 25, height: 25 }}
            resizeMode="stretch"
          />
          <Image
            source={require('../../assets/sketch.png')}
            style={{ width: 25, height: 25 }}
            resizeMode="stretch"
          />
        </View>
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 17,
              fontWeight: '600',
              color: '#334d5c',
            }}
          >
            Sobre
          </Text>
          <Text style={{ fontFamily: 'Lato-Regular', color: '#334d5c' }}>
            Somos uma construtora consolidada no mercado, valorizamos as pessoas
            e por isso o serviço que prestamos é totalmente voltado para o bem
            estar social, nossa missão é construir não apenas edificações
            melhores, mas também uma sociedade melhor.
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            marginVertical: 30,
            width: 200,
            alignSelf: 'center',
            borderColor: '#ccc',
          }}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 17,
              fontWeight: '600',
              color: '#334d5c',
            }}
          >
            O que fazemos...
          </Text>
          <Text
            style={{
              color: '#334d5c',
              marginVertical: 20,
              fontFamily: 'Lato-Regular',
              fontSize: 15,
            }}
          >
            Por meio de nosso trabalho em manutenção predial, prestamos serviço
            a todos os cidadãos, entre eles estão:
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/police.png')}
                style={{ width: 35, height: 35 }}
                resizeMode="stretch"
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  color: '#334d5c',
                  fontSize: 16,
                }}
              >
                Segurança Pública
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  flex: 1,
                  color: '#b8b89f',
                }}
              >
                " Manutenções e Reformas em instalações Jurídicas "
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/school.png')}
                style={{ width: 35, height: 35 }}
                resizeMode="stretch"
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  color: '#334d5c',
                  fontSize: 16,
                }}
              >
                Educação
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  flex: 1,
                  color: '#b8b89f',
                }}
              >
                " Manutenções e Reformas em instalações Educacionais "
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#eee',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/hospital.png')}
                style={{ width: 35, height: 35 }}
                resizeMode="stretch"
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 5 }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  color: '#334d5c',
                  fontSize: 16,
                }}
              >
                Saúde
              </Text>
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  flex: 1,
                  color: '#b8b89f',
                }}
              >
                " Manutenções e Reformas em instalações Hospitalares "
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            marginVertical: 30,
            width: 200,
            alignSelf: 'center',
            borderColor: '#ccc',
          }}
        />
        <View style={{ marginBottom: 20, marginHorizontal: 15 }}>
          <Text
            style={{
              fontWeight: '600',
              color: '#334d5c',
              marginBottom: 20,
              fontFamily: 'Lato-Bold',
              fontSize: 17,
            }}
          >
            Dentre nossos valores estão...
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Feather name="check" size={25} color="#f48024" />
            <Text
              style={{
                fontWeight: '600',
                color: '#334d5c',
                fontFamily: 'Lato-Regular',
                fontSize: 19,
                marginLeft: 10,
              }}
            >
              Transparência
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Feather name="check" size={25} color="#f48024" />
            <Text
              style={{
                fontWeight: '600',
                color: '#334d5c',
                fontFamily: 'Lato-Regular',
                fontSize: 19,
                marginLeft: 10,
              }}
            >
              Ética
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Feather name="check" size={25} color="#f48024" />
            <Text
              style={{
                fontWeight: '600',
                color: '#334d5c',
                fontFamily: 'Lato-Regular',
                fontSize: 19,
                marginLeft: 10,
              }}
            >
              Inovação
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Feather name="check" size={25} color="#f48024" />
            <Text
              style={{
                fontWeight: '600',
                color: '#334d5c',
                fontFamily: 'Lato-Regular',
                fontSize: 19,
                marginLeft: 10,
              }}
            >
              Adaptação a Mudanças
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <Feather name="check" size={25} color="#f48024" />
            <Text
              style={{
                fontWeight: '600',
                color: '#334d5c',
                fontFamily: 'Lato-Regular',
                fontSize: 19,
                marginLeft: 10,
              }}
            >
              Empreendedorismo
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginVertical: 10,
            }}
          >
            <Entypo name="dot-single" size={30} color="#ccc" />
            <Entypo name="dot-single" size={30} color="#ccc" />
            <Entypo name="dot-single" size={30} color="#ccc" />
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: '#a8a8a8',
              marginBottom: 15,
            }}
          >
            "Muito mais que colaboradores, temos parceiros, trabalhamos juntos,
            e por isso somos uma grande família"
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: '#a8a8a8',
              marginBottom: 10,
            }}
          >
            "Apreciamos a simplicidade e humildade, aqueles que querem crescer
            conosco estamos sempre com as portas abertas."
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              color: '#a8a8a8',
              marginBottom: 10,
            }}
          >
            "Construir um teto é construir um lar, um sonho, e é por isso que
            nos sentimos diariamnete honrados em lhe prestar esse serviço tão
            nobre."
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              marginVertical: 5,
              color: '#334d5c',
            }}
          >
            São palavras do Diretor Sidney Pereira Rosa, que dedica todo seu
            amor e comprometimento a este trabalho.
          </Text>
        </View>
        <View
          style={{
            height: 150,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#f48024',
            }}
            onPress={() =>
              Alert.alert(
                'Ficamos feliz pelo seu interesse.',
                'Entre em contato conosco pelo telefone (65) 3686-3173 ou envie em e-mail em algum dos endereços de email abaixo que entraremos em contato.'
              )
            }
          >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#f48024' }}>
              Quero ser Parceiro
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 40,
              width: 200,
              borderWidth: 1,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#f48024',
              backgroundColor: '#f48024',
            }}
            onPress={() => navigation.navigate('Signin')}
          >
            <Text style={{ fontSize: 15, fontWeight: '500', color: '#fff' }}>
              Já sou Parceiro
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#eeeeee' }}>
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              fontSize: 19,
              alignSelf: 'center',
              marginTop: 20,
            }}
          >
            Avanci Construção e serviços
          </Text>
          <Text
            style={{
              color: '#f48024',
              alignSelf: 'center',
              marginBottom: 20,
              fontFamily: 'Lato-Regular',
              fontSize: 15,
            }}
          >
            www.avancicontrucao.com
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 2,
            }}
          >
            <Feather name="phone-call" size={20} color="#f48024" />
            <Text style={{ marginHorizontal: 10, fontFamily: 'Lato-Regular' }}>
              (65) 3686-3173
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ marginHorizontal: 30, fontFamily: 'Lato-Regular' }}>
              (65) 98127-1383
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 2,
            }}
          >
            <Feather name="mail" size={20} color="#f48024" />
            <Text style={{ fontFamily: 'Lato-Regular', marginHorizontal: 10 }}>
              compras@avanciconstrucao.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 2,
            }}
          >
            <Text style={{ fontFamily: 'Lato-Regular', marginHorizontal: 30 }}>
              financeiro@avanciconstrucao.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: 'Lato-Regular', marginHorizontal: 30 }}>
              ti@avanciconstrucao.com
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 20,
            }}
          >
            <Text style={{ fontFamily: 'Lato-Bold', marginHorizontal: 10 }}>
              Rodoanel Mário Covas
            </Text>
            <Text style={{ fontFamily: 'Lato-Bold', marginHorizontal: 10 }}>
              Vila Formosa
            </Text>
            <Text style={{ fontFamily: 'Lato-Bold', marginHorizontal: 10 }}>
              Cuiabá - MT, 78058-791
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
