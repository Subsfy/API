# Subsfy

### Your subscriptions manager

#### Infra

- DB: POSTGRESQL
- Nodemailer: Mailtrap ? Mailgun | Sendgrid | Mailchimp
- Socket.io?

#### Domains

- User
- Service
- Subscription

#### User create

- OAuth2 (Google / Apple?)
- Escolha da moeda
- Cadastro de métodos de pagamentos, ex.:
```["crédito nubank", "boleto", "itaú"]```

id     | name   | avatar | email  | currency | pay_methods
:----- | :----: | :----: | :----: | :----:   | :----:
string | string | string | string | string   | string[]

#### Services

- Deixar pré cadastradas as streams mais conhecidas/utilizadas no Brasil
- Permitir o cadastro de novas streams existentes pelo app (Cadastro de uma subscription)

id     | name   | logo   | type   | color
:----: | :----: | :----: | -----: | :----:
string | string | string | enum   | string

#### Subscription create

- OBS.: Procurar API que liste streams existentes
- Selecionar uma stream;
- Caso seja uma stream não existente no app, enviar dados para a criação de uma nova stream;
- Caso seja uma assinatura compartilhada, enviar um array com o seguinte formato no campo people:

```[{name: string, email: string, value: float}]```

id     | description | price  | pay_method | payday | cycle  | duration | reminder | currency | shared  | people
:----: | :---------: | :----: | :--------: | :----: | :----: | :------: | :------: | :------: | :-----: | :------:
string |   string    | float  | string     |  date  | enum   | string   | string   | string   | boolean | array

id_stream | id_user
:----:    | :-------:
string    | string

### Future goals

- Controle de gastos;
