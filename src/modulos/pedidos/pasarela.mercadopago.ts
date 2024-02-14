import { Injectable } from "@nestjs/common";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PedidoDocument } from "src/modulos/pedidos/pedido/schemas/pedido.schema";

interface PedidoPasarela{
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
}

interface PedidoPersona{
  nombre: string;
  apellido: string;
  email: string;
}

@Injectable()
export class PasarelaMercadoPagoService{
    private client!: MercadoPagoConfig;
    private preference!: Preference;
  constructor(
  ) {
    this.client = new MercadoPagoConfig({ accessToken: '' });
    this.preference = new Preference(this.client);

  }

  async crearPasarela(persona:PedidoPersona,pedido:PedidoPasarela): Promise<{link:string, id:string}> {
    try {
      const passport = await this.preference.create({body: {
        items: [
          {
            id: 'item-ID-'+pedido.id,
            title: pedido.nombre||'comida',
            currency_id: 'BRL',
            description: pedido.descripcion||'comida',
            category_id: 'food',
            quantity: 1,
            unit_price: pedido.precio
          }
        ],
        payer: {
          name: persona.nombre,
          surname: persona.apellido,
          email: persona.email
        },
        back_urls: {
          success: 'https://www.success.com',
          failure: 'http://www.failure.com',
          pending: 'http://www.pending.com'
        },
        auto_return: 'approved',
        payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [
                  {
                            id: "ticket"
                  }
        ],
        installments: 2
},
        notification_url: 'https://www.your-site.com/ipn',
        statement_descriptor: 'MEUNEGOCIO',
        external_reference: 'Reference_'+pedido.id,
        expires: false
      }});
      console.log('passport:',passport);
      return {link: passport.init_point, id: passport.id};
    } catch (error) {
      throw new Error('Error al crear pasarela');
    }
  }
}