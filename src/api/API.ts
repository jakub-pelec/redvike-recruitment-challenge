export class API {
  private static BASE_URL: string = 'https://pokeapi.co/api/v2'

  // since we will be using a read-only api, there is no need to handle other methods than POST, and no need to handle request body
  private static request(url: string, method: 'GET' = 'GET') {
    return fetch(`${this.BASE_URL}${url}`, {
      method,
    })
  }

  private static GET(url: string) {
    return this.request(url)
  }

  static async getAllPokemons() {
    try {
      const response = await this.GET('/pokemon?limit=151')
      if (response.status !== 200) {
        throw new Error('Cannot fetch pokemons')
      }
      const result = await response.json()
      return result
    } catch (e) {
      throw new Error('Cannot fetch pokemons')
    }
  }

  static async getPokemonById(id: number) {
    try {
      const response = await this.GET(`/pokemon/${id.toString()}`)
      if (response.status !== 200) {
        throw new Error('Cannot fetch pokemons')
      }
      const result = await response.json()
      return result
    } catch (e) {
      throw new Error('Cannot fetch pokemons')
    }
  }
}
