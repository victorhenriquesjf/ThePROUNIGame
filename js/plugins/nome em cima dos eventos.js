#==============================================================================
# ** Evento Mostrar Texto
#==============================================================================
# Criado por: ÁØµ¹
# Modificado, Adaptado e Melhorado por: Nietore
# Traduzido por: Nietore
# Acesse: Www.AldeiaRpgBr.Com
#==============================================================================
# * Instruções
#
# - Criando evento para mostrar nome
# - Crie um comentário com:
# [Nome= Nome Aqui]
#------------------------------------------------------------------------------
#==============================================================================
#==============================================================================
# ** Game_Character
#==============================================================================
class Game_Character
#--------------------------------------------------------------------------
# * Escolher as cores
#--------------------------------------------------------------------------
Event_Color = Color.new(0, 225, 255)
Player_Color = Color.new(255, 255, 255)
#--------------------------------------------------------------------------
# * Escolha o que você quer mostrar no personagem
# ~ 'Nome', 'Classe', 'Nivel', 'Hp', 'Mp'
#--------------------------------------------------------------------------
Player_Text = 'Nome'
#--------------------------------------------------------------------------
# * Vareavel de instancia publica
#--------------------------------------------------------------------------
attr_accessor :text_display
end
#==============================================================================
# ** Game_Event
#==============================================================================

class Game_Event < Game_Character
#--------------------------------------------------------------------------
# * Alias Listings
#--------------------------------------------------------------------------
alias seph_characterdisplay_gevent_refresh refresh
#--------------------------------------------------------------------------
# * Atualização
#--------------------------------------------------------------------------
def refresh
# Methodo de Atualização Original
seph_characterdisplay_gevent_refresh
# Checa se o evento está com o comando no comentário
unless @list.nil?
for i in 0...@list.size
if @list[i].code == 108
@list[i].parameters[0].dup.gsub!(/\[[Nn][Oo][Mm][Ee][=](.+?)\]/) do
@text_display = [$1, Event_Color]
end
end
end
end
@text_display = nil if @erased
end
end
#==============================================================================
# ** Game_Player
#==============================================================================
class Game_Player < Game_Character

alias seph_characterdisplay_gplayer_refresh refresh
#--------------------------------------------------------------------------
# * Atualização
#--------------------------------------------------------------------------
def refresh
# Methodo de Atualização Original
seph_characterdisplay_gplayer_refresh
# Pega o personagem principal
actor = $game_party.members[0]
# Determina o texto
case Player_Text
when 'Nome'
txt = actor.name
when 'Classe'
txt = actor.class_name
when 'Nivel'
txt = "Nivel: #{actor.level}"
when 'Hp'
txt = "HP: #{actor.hp} / #{actor.maxhp}"
when 'Mp'
txt = "MP: #{actor.sp} / #{actor.maxsp}"
else
txt = ''
end
# Creates Text Display
@text_display = [txt, Player_Color]
end
end
#==============================================================================
# ** Sprite_Character
#==============================================================================
class Sprite_Character

alias seph_characterdisplay_scharacter_update update
#--------------------------------------------------------------------------
# * Atualizar Frame
#--------------------------------------------------------------------------
def update
# Methodo de Atualização Original
seph_characterdisplay_scharacter_update
# Methodo de atualização para mostrar o nome no evento
update_display_text
end
#--------------------------------------------------------------------------
# * Cria o Sprite para Mostrar
#--------------------------------------------------------------------------
def create_display_sprite(args)
bitmap = Bitmap.new(160, 24)
# Tamanho da Font
bitmap.font.size = 15
# Texto com Sombra
bitmap.font.draw_shadow = false if bitmap.font.respond_to?(:draw_shadow)
bitmap.font.color = Color.new(0, 0, 0)
bitmap.draw_text(1, 1, 160, 24, args[0], 1)
# Cor da Font
bitmap.font.color = args[1]
# Texto
bitmap.draw_text(0, 0, 160, 24, args[0], 1)
# Desenha o texto
@_text_display = Sprite.new(self.viewport)
@_text_display.bitmap = bitmap
@_text_display.ox = 80
@_text_display.oy = 10
@_text_display.x = self.x
@_text_display.y = self.y - self.oy / 2 - 24
@_text_display.z = 30001
@_text_display.visible = self.visible #true
end

def dispose_display_text
@_text_display.dispose unless @_text_display.nil?
end

def update_display_text
unless @character.text_display.nil?
create_display_sprite(@character.text_display) if @_text_display.nil?
@_text_display.x = self.x
@_text_display.y = self.y - self.oy / 2 - 24
else
dispose_display_text unless @_text_display.nil?
end
end
end