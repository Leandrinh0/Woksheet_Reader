# *API de Leitura e Formatação de Planilhas de Fretes*

## Introdução

Esta API permite a leitura e formatação de planilhas de fretes, facilitando o cadastro de transportadoras e padrões de leitura de planilhas para extração de informações essenciais.

## Tecnologias Utilizadas

- **NestJS** (com Fastify)
- **Fastify Multipart** para upload de arquivos
- **xlsx** para manipulação de planilhas
- **TypeScript**

## Instalação e Execução

1. Clone o repositório:

   ```sh
   git clone https://github.com/Leandrinh0/Woksheet_Reader.git
   cd Woksheet_Reader
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`:
  ```sh
  LISTEN_PORT =

  DB_PORT =
  DB_HOST =
  DB_USERNAME =
  DB_PASSWORD =
  DB_NAME =
  DB_SCHEMA =
  ```

4. Inicie a aplicação:

   ```sh
   npm run start
   ```

## Endpoints da API

### 1. Criar uma Transportadora

**Rota:** `POST /carriers/create`

**Exemplo de Payload:**

```json
{
    "name": "Carrier Name Example"
}
```

**Resposta Esperada:**

```json
{
    "id": 1,
    "name": "Carrier Name Example"
}
```

---

### 2. Criar um Padrão de Leitura de Planilha

**Rota:** `POST /fields/create`

**Exemplo de Payload:**

```json
{
    "name": "Table Layout Name Example",
    "carrierId": 0,
    "originIndex": "A2",
    "destinationIndex": "B2",
    "deadlineIndex": "C2",
    "cepIndex": "D2",
    "distanceIndex": "E2",
    "fixPriceIndex": "F2",
    "tda": "G2",
    "trt": "H2",
    "tde": "I2",
    "tzr": "J2"
}
```

**Descrição dos Campos Opcionais:**

- **originIndex**: Coluna da cidade de origem do frete.
- **destinationIndex**: Coluna da cidade de destino do frete.
- **deadlineIndex**: Coluna do prazo do frete.
- **cepIndex**: Coluna do CEP do frete.
- **distanceIndex**: Coluna da distância do frete.
- **fixPriceIndex**: Coluna do valor fixo do frete.
- **tda, trt, tde, tzr**: Outras colunas específicas relacionadas ao frete.

Os valores devem seguir o padrão **"A2"** (somente a célula inicial) ou **"A2-A10"** (intervalo de células).

---

## Upload e Processamento de Planilha

**Rota:** `POST /fields/read/:readId`

**Parâmetro:**

- `readId`: ID do padrão de leitura de planilha previamente cadastrado.

**Upload de Arquivo:**
O arquivo deve ser enviado como **multipart/form-data** com um campo chamado `file`.

**Exemplo de Uso (cURL):**

```sh
curl -X POST -F "file=@planilha.xlsx" http://localhost:3000/fields/read/1
```

**Resposta Esperada:**

```json
{
      {
          "Cidade Destino": "-",
          "Prazo em Dias": "-",
          "CEP": "-",
          "Distância": "-",
          "Preço fixo": "-",
          "T.D.A": "-",
          "T.R.T": "-",
          "T.D.E": "-",
          "T.Z.R": "-"
      },
      {
          "Cidade Destino": "-",
          "Prazo em Dias": "-",
          "CEP": "-",
          "Distância": "-",
          "Preço fixo": "-",
          "T.D.A": "-",
          "T.R.T": "-",
          "T.D.E": "-",
          "T.Z.R": "-"
      }
}
```

---

## Considerações Finais

- Certifique-se de cadastrar um **carrier** antes de criar um **padrão de leitura**.
- Verifique se os índices das colunas estão corretos.
- Certifique-se de setar uma célula final para busca ("A2-A10") caso haja quebras na planilha como subtítulos.

---

**Desenvolvido por Leandro Mello** 🚀

