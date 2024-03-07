export const registerOrChangeMessage = (
  userId: string,
  idCompany: string,
  service: string,
  typeAction: string
) => {
  let title: string;
  let info: string;
  let route: string;
  let btn: string;

  if (typeAction == "create") {
    title = "Meu cadastro";
    info =
      "Para finalizar o seu cadastro, você será redirecionado para criar seu usuário e senha";
    route = "cadastro";
    btn = "Finalizar cadastro";
  } else {
    title = "Redefinição de senha";
    info = "Você será redirecionado para redefinir a senha";
    route = "nova_senha";
    btn = "Redefinir senha";
  }

  return ` 
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }

                h1 {
                    color: #1e92c8;
                }

                a {
                    text-decoration: none;
                }

                #container {
                    background: #fff;
                    border-radius: 0.5rem;
                    border: 2px solid #9d9797;
                    padding: 1rem;
                }

                p {
                    color: #9D9797;
                }

                button {
                background: #5dc4e4;
                color: #fff;
                border-radius: 0.5rem;
                border: transparent;
                height: 2rem;
                }
            </style>
        </head>
        <body>
            <div id='container'> 
                <h1>${title}</h1>

                <p>Seja muito bem vindo ao nosso serviço de autenticação</p>

                <p>
                    ${info}
                </p>

                <button>
                    <a href="${process.env.AUTHENTICATOR_FRONT}/${route}/${service}/${userId}/${idCompany}">${btn}</a>
                </button>
            </div>
        </body>
    </html>`;
};

export const resetPasswordMessage = (userId: string, service: string) => {
  return ` 
      <html>
          <head>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                  }
  
                  h1 {
                      color: #1e92c8;
                  }

                  a {
                    text-decoration: none;
                  }
  
                  #container {
                      background: #fff;
                      border-radius: 0.5rem;
                      border: 2px solid #9d9797;
                      padding: 1rem;
                  }
  
                  p {
                      color: #9D9797;
                  }
  
                  button {
                  background: #5dc4e4;
                  color: #fff;
                  border-radius: 0.5rem;
                  border: transparent;
                  height: 2rem;
                  }
              </style>
          </head>
          <body>
              <div id='container'> 
                  <h1>Redefinição de senha</h1>
  
                  <p>Seja muito bem vindo ao nosso serviço de autenticação</p>
  
                  <p>
                     Aqui você poderá criar uma nova senha, clique no botão abaixo!
                  </p>
  
                  <button>
                      <a href="${process.env.AUTHENTICATOR_FRONT}/nova_senha/${service}/${userId}">Criar nova senha</a>
                  </button>
              </div>
          </body>
      </html>`;
};
