import SearchHistory from '../models/SearchHistory.js'

export default class HistoryController {
  static async save(req, res) {
    try {
      const userId = req.user.id
      const { query } = req.body

      if (!query) return res.status(400).json({ error: 'Query é obrigatória' })

      await SearchHistory.create({ userId, query })

      const history = await SearchHistory.find({ userId }).sort({ createdAt: -1 })
      if (history.length > 5) {
        const toDelete = history.slice(5)
        await Promise.all(toDelete.map(doc => doc.deleteOne()))
      }

      return res.status(201).json({ message: 'Histórico salvo com sucesso' })
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao salvar histórico' })
    }
  }

  static async list(req, res) {
    try {
      const userId = req.user.id
      const history = await SearchHistory.find({ userId }).sort({ createdAt: -1 }).limit(5)
      return res.json({ data: history })
    } catch (err) {        
      console.error('[HISTORY ERROR]', err)
      return res.status(500).json({ error: 'Erro ao buscar histórico' })
    }
  }
}
